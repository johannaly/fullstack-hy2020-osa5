import React, { useState, useEffect, useRef } from 'react'
import './App.css'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [alertMessage, setAlertMessage] = useState(null)
  const [isAlert, setAlert] = useState(false)
  const blogFormRef = useRef()

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

  const handleLogin = async (event) => {
    event.preventDefault()
    //console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password
      })
      setUser(user)

      if(user !== null) {
        //console.log(user)
        window.localStorage.setItem(
          'loggedBlogappUser', JSON.stringify(user)
        )
        blogService.setToken(user.token)
        //setUser(user)
        setUsername('')
        setPassword('')
        setAlertMessage(`${username} logged in`)
        setTimeout(() => {
          setAlertMessage(null)
          setAlert(false)
        }, 5000)

      } else {
        //console.log("else: " + user)
        setUsername('')
        setPassword('')
        setAlertMessage('wrong username or password')
        setAlert(true)
        window.localStorage.clear()

        setTimeout(() => {
          setAlertMessage(null)
          setAlert(false)
        }, 5000)
      }

    } catch (exception) {
      console.log('exception caught: ' + exception)
      setAlertMessage('wrong credentials')
      setAlert(true)
      setTimeout(() => {
        setAlertMessage(null)
        setAlert(false)
      }, 5000)
    }
  }

  // eslint-disable-next-line no-unused-vars
  const handleLogout = async (event) => {
    window.localStorage.clear()
    setUser(null)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id='password'
          type="text"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type='submit'>login</button>
    </form>
  )

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const returnedBlog = await blogService.create(blogObject)
    const updatedBlogs = await blogService.getAll()
    setBlogs(updatedBlogs)
    setAlertMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
    setAlert(false)
    setTimeout(() => {
      setAlertMessage(null)
    }, 5000)
  }

  const addLike = async (blogToModify) => {
    await blogService.modifyBlog(blogToModify)
    const updatedBlogs = await blogService.getAll()
    setBlogs(updatedBlogs)
  }

  const deleteBlog = async (id) => {
    await blogService.deleteBlog(id)
    const updatedBlogs = await blogService.getAll()
    setBlogs(updatedBlogs)
  }

  if (user === null && isAlert === false) {
    return (
      <div>
        <h2>Blogs</h2>
        <h2>Log in to application</h2>
        <div>
          {loginForm()}
        </div>
      </div>
    )
  } else if (user === null && isAlert === true) {
    return (
      <div>
        <h2>Blogs</h2>
        <Notification message = {alertMessage} isAlert = {isAlert}/>
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
      <Notification message = {alertMessage} isAlert = {isAlert}/>
      <p>{user.name} logged in</p>
      <button id='logout-button' onClick={handleLogout}>logout</button>

      <Togglable buttonLabel = 'create new blog' ref = {blogFormRef}>
        <BlogForm
          createBlog = {addBlog}
        />
      </Togglable>

      <div id='blogs'>
      <ul id='blog'>
        {blogs
          .sort((a, b) => b.likes > a.likes ? 1 : -1)
          .map(blog =>
            <Blog
              key = {blog.id}
              blog = {blog}
              addLike = {addLike}
              user = {user}
              deleteBlog = {deleteBlog}
            />
          )}
      </ul>
      </div>
    </div>
  )
}


export default App