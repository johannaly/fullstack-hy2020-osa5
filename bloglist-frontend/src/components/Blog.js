import React, { useState } from 'react'

const Blog = ({ blog, addLike, deleteBlog, user }) => {
  const [visible, setVisible] = useState(false)
  const [buttonText, setButtonText] = useState('view')


  const blogStyle = {
    paddingTop:10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const buttonStyle = {
    marginRight: 5
  }

  const blueButtonStyle = {
    backgroundColor: 'lightblue'
  }

  // eslint-disable-next-line no-unused-vars
  const toggleVisible = (event) => {
    if(visible === false) {
      setButtonText('hide')
      setVisible(true)
    } else {
      setButtonText('view')
      setVisible(false)
    }
  }


  const handleLike = () => {
    addLike({
      title: blog.title,
      id: blog.id,
      likes: blog.likes + 1,
      author: blog.author,
      url: blog.url
    })
  }

  const handleDelete = () => {
    const result = window.confirm(`Remove ${blog.title} by ${blog.author}`)
    if(result) {
      deleteBlog(
        blog.id
      )
    }
  }


  if(visible === false) {
    return (
      <div style = {blogStyle}>
        <div>
          <p>
            {blog.title} {blog.author}
            <button style = {buttonStyle} onClick= {toggleVisible}>{buttonText}</button>
          </p>
        </div>
      </div>
    )}


  return (
    <div style = {blogStyle} className='blog'>
      <div>
        <p>
          {blog.title} {blog.author}
          <button style = {buttonStyle} onClick= {toggleVisible}>{buttonText}</button>
        </p>
        <p>{blog.url}</p>
        <p className='likes'>
          {blog.likes}
          <button style= {buttonStyle} onClick= {handleLike}>like</button>
        </p>
        {blog.user.id === user.id &&
          <p>
            <button style = {blueButtonStyle} onClick={handleDelete}>remove</button>
          </p>
        }
      </div>
    </div>
  )
}


export default Blog
