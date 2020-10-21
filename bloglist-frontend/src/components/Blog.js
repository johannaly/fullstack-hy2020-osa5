import React, { useState } from 'react'

const Blog = ({ blog, addLike }) => {
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
    <div style = {blogStyle}>
      <div>
        <p>
          {blog.title} {blog.author}
          <button style = {buttonStyle} onClick= {toggleVisible}>{buttonText}</button>
        </p> 
        <p>{blog.url}</p>
        <p>
          {blog.likes}
          <button style= {buttonStyle} onClick= {handleLike}>like</button>
        </p>
      </div>
    </div>
  )
}


export default Blog
