import React from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, handleUpdateBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = (likedBlog) => {
    const updateBlog = {...likedBlog, likes: likedBlog.likes +1}
    console.log('updating blog ', updateBlog)
    handleUpdateBlog(updateBlog)
  }

  return (
  <div style={blogStyle}>
    <div>
      {blog.title} {blog.author}
    </div>
    
    <Togglable buttonLabel="view" buttonOffLabel="hide">
      <p>togglable view</p>
      <p>{blog.url}</p>
      <p>{blog.likes} <button type="submit" onClick={() => handleLike(blog)} >like</button> </p>
      <p>{blog.user ? blog.user.username : ''}</p>
    </Togglable>
  </div>
  )
}

export default Blog
