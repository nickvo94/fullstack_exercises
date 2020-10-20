import React from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, handleUpdateBlog, username, handleDeleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = (likedBlog) => {
    const updateBlog = { ...likedBlog, likes: likedBlog.likes +1 }
    console.log('updating blog ', updateBlog)
    handleUpdateBlog(updateBlog)
  }

  const handleRemove = (removingBlog) => {
    //console.log('updating blog ', updateBlog)
    handleDeleteBlog(removingBlog)
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
        <p>{blog.user ? blog.user.username  : ''}</p>
        {blog.user && blog.user.username === username ?
          <button type="submit" onClick={() => handleRemove(blog)} >remove</button> : ''}
        <br></br>
      </Togglable>
    </div>
  )
}

export default Blog
