import React, {useState} from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, handleUpdateBlog, username, handleDeleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [view, setView] = useState(false)


  const handleLike = (likedBlog) => {
    const updateBlog = { ...likedBlog, likes: likedBlog.likes +1 }
    console.log('updating blog ', updateBlog)
    handleUpdateBlog(updateBlog)
  }

  const handleRemove = (removingBlog) => {
    //console.log('updating blog ', updateBlog)
    handleDeleteBlog(removingBlog)
  }

  const showWholeBlog = () => {
    return(
      <div>
        <p>togglable view</p>
        <p>{blog.url}</p>
        <p>{blog.likes} <button type="submit" onClick={() => handleLike(blog)} >like</button> </p>
        <p>{blog.user ? blog.user.username  : ''}</p>
        {blog.user && blog.user.username === username ?
          <button type="submit" onClick={() => handleRemove(blog)} >remove</button> : ''}
        <br></br>
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} 
        <button type="submit" onClick={() => setView(!view)} > {view ? 'hide' : 'view'} </button>
      </div>

      {view && showWholeBlog()}
    </div>
  )
}

export default Blog