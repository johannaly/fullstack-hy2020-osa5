import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
 // const [newBlog, setNewBlog] = useState([])
  const [title, setNewTitle] = useState('')
  const [author, setNewAuthor] = useState('')
  const [url, setNewUrl] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs =>
        setBlogs(blogs)
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


  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }
    const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      //setNewBlog('')
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('') 
    }
  
  

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password
      })
      
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage("wrong credentials")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    window.localStorage.clear()
    setUser(null)
  }
/*
  const handleBlogChange = (event) => {
    setNewBlog(event.target.value)
    console.log(newBlog)
  }
*/
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  )
  
    const blogForm = () => (
      <form onSubmit = {addBlog}>
        <div>
          <div>
          Title:
          <input type = "title"
              value = {title}
              name = "title"
              onChange = {({ target }) => setNewTitle(target.value)}
          />
          </div>
          <div>
          Author:
            <input type = "author"
              value = {author}
              name = "author"
              onChange = {({ target }) => setNewAuthor(target.value)}
          />
          </div>
          <div>
          Url:
            <input type = "text"
              value = {url}
              name = "url"
              onChange = {({ target }) => setNewUrl(target.value)}
          />
          </div>
        </div>
        <button type = 'submit'>Create</button>
      </form>
    )
  

  if (user === null) {
    return (
      <div>
        <h2>Blogs</h2>
        <h2>Log in to application</h2>
        <div>
          {loginForm()}
        </div>
      </div>
    )
  }
  return (
    <div>
      <h2>Blogs</h2>
      <p>{user.name} logged in</p>
      <button onClick={handleLogout} >logout</button>
      <h2>Create new</h2>
      <div>
        {blogForm()}
      </div>

      <ul>
        {blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
          />
        )}
      </ul>
    </div>
  )


}


export default App