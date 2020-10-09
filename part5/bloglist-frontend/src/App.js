import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState({title: '', author : '' , url: ''})
  const [title, setTitle] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

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
      handleNotification({class: 'error', text: 'Wrong credentials'})
    }

  }

  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setUsername('')
    setPassword('')
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    console.log(newBlog)

    try {
      await blogService.create(newBlog)
    } catch (e) {
      console.log('catch error' , e)
      handleNotification({class: 'error', text: e.message})
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

  const NewBlogForm = () => (
    <form onSubmit={handleCreateBlog}>
      <h2>create new</h2>
      <div>
        title
          <input
          type="text"
          value={newBlog.title}
          name="Title"
          onChange={({ target }) => setNewBlog({...newBlog, title: target.value}) }
        />
      </div>
      <div>
        author
          <input
          type="text"
          name="author"
          value={newBlog.author}
          onChange={({ target }) => setNewBlog({...newBlog, author: target.value})}
          />
      </div>
      <div>
        url
          <input
          type="text"
          name="url"
          value={newBlog.url}
          onChange={({ target }) => setNewBlog({...newBlog, url: target.value})}
        />
      </div>
      <button type="submit">create</button>
    </form> 

  )

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
      {NewBlogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      {user === null && <LoginForm props={loginFormComponents} /> }
      {user !== null && BlogForm()}
    </div>
  )
}

export default App