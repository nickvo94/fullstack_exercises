import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlogForm from './components/NewBlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  //const [newBlog, setNewBlog] = useState({title: '', author : '' , url: ''})
  //const [title, setTitle] = useState(null)

  useEffect(() => {
    fetchAll()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const fetchAll = () => {
    blogService.getAll().then(blogs =>{
      blogs.sort((blog1, blog2) => Number(blog2.likes) - Number(blog1.likes) )
      return setBlogs( blogs )
    })
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    //console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })
      console.log('user', user)

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

    } catch (exception) {
      let err = exception.response.data.error ? 
        exception.response.data.error : exception.response.statusText
      console.log('exception ', err, exception.response)
      handleNotification({class: 'error', text: err})
    }

  }

  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setUsername('')
    setPassword('')
  }

  const handleCreateBlog = async (event, newBlog) => {
    event.preventDefault()
    console.log(newBlog)

    try {
      const added = await blogService.create(newBlog)
      handleNotification({class: 'success', text: `a new blog ${added.title} by ${added.author} added` })
      fetchAll()
    } catch (e) {
      console.log('catch error' , e)
      handleNotification({class: 'error', text: e.message})
    }   
    
  }

  const handleUpdateBlog = async (newBlog) => {
    //console.log(newBlog)

    try {
      const updated = await blogService.update(newBlog)
      fetchAll()
      handleNotification({class: 'success', text: `a new blog ${updated.title} by ${updated.author} updated` })
    } catch (e) {
      console.log('catch error' , e)
      handleNotification({class: 'error', text: e.message})
    }   
    
  }

  const handleDeleteBlog = async (blog) => {
    //console.log(newBlog)
    const confirmed = window.confirm(`Are you sure to delete the blog by author ${blog.author} !?`)
    if (confirmed) {
      try {
        const id = blog.id
        const deleted = await blogService.deleteBlog(id)
        fetchAll()
        handleNotification({class: 'success', text: `the blog is deleted` })
      } catch (e) {
        console.log('catch error' , e)
        handleNotification({class: 'error', text: e.message})
      }

    }   
    
  }

  const handleNotification = (message) => {
    if (message) {
      console.log('handle notification...' , message)
      if (message.class === 'error') {
        setMessage(message)
      }
      else if (message.class === 'success') {
        setMessage(message)
      }

      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const loginFormComponents = { 
    handleLogin, 
    setUsername, 
    setPassword,
    username,
    password 
  }

  const BlogForm = () => (
    <div>
      <p>
        {user.name} logged-in 
        <button type="submit" onClick={handleLogout}>logout</button> 
      </p>
      <Togglable buttonLabel="create new blog 2">
        <NewBlogForm handleCreateBlog={handleCreateBlog} />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleUpdateBlog={handleUpdateBlog} username={user.username} handleDeleteBlog={handleDeleteBlog} />
      )}
    </div>
  )

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      {user === null && <LoginForm props={loginFormComponents} /> }
      <Togglable buttonLabel="create new blog 1">
      <p>togglable</p>
        <NewBlogForm handleCreateBlog={handleCreateBlog} />
      </Togglable>
      {user !== null && BlogForm()}
    </div>
  )
}

export default App