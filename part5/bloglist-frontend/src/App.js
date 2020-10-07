import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

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
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }

  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setUsername('')
    setPassword('')
  }

  const handleCreateBlog = (event) => {
    console.log(event)
  }

  const NewBlogForm = () => (
    <form onSubmit={handleCreateBlog}>
      <h2>create new</h2>
      <div>
        title
          <input
          type="text"
          value={username}
          name="title"
          onChange={}
        />
      </div>
      <div>
        author
          <input
          type="text"
          value={username}
          name="author"
          onChange={}
        />
      </div>
      <div>
        url
          <input
          type="password"
          value={password}
          name="url"
          onChange={}
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
      
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  return (
    <div>
      <h2>blogs</h2>
      {user === null && <LoginForm props={loginFormComponents} /> }
      {user !== null && BlogForm()}
    </div>
  )
}

export default App