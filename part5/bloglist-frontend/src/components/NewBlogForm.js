import React, { useState } from 'react'

const NewBlogForm = ({handleCreateBlog}) => {
    const [newBlog, setNewBlog] = useState({title: '', author : '' , url: ''})
    
    return (
        <form onSubmit={(e) => handleCreateBlog( e ,newBlog)}>
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
}

export default NewBlogForm