import React from 'react'

const BlogForm = ({ 
    addBlog,
    handleTitleChange,
    handleAuthorChange,
    handleUrlChange,
    title, 
    author,
    url
}) => {
    return (
        <div>
            <h2>New Blog</h2>
            <form onSubmit= {addBlog}>
                <div>
                    Title: 
                    <input
                        value={title}
                        onChange={handleTitleChange}
                    />
                </div>
                <div>
                    Author:
                    <input 
                        type = "author"
                        value = {author}
                        onChange = {handleAuthorChange}
                    />
                </div>
                <div>
                    Url:
                    <input
                        type = "text"
                        value = {url}
                        onChange = {handleUrlChange}
                    />
                </div>
                <button type = "submit">new blog</button>
            </form>
        </div>
    )
}

export default BlogForm