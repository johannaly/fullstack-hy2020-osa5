import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setNewTitle] = useState('')
  const [author, setNewAuthor] = useState('')
  const [url, setNewUrl] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>New Blog</h2>
      <form onSubmit= {addBlog}>
        <div>
                    Title:
          <input
            id='title'
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
                    Author:
          <input
            id='author'
            type = 'text'
            value = {author}
            onChange = {handleAuthorChange}
          />
        </div>
        <div>
                    Url:
          <input
            id='url'
            type = "text"
            value = {url}
            onChange = {handleUrlChange}
          />
        </div>
        <button id='createNew-button' type = "submit">create new</button>
      </form>
    </div>
  )
}




export default BlogForm