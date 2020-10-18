import React, { useState, useEffect } from 'react'
import './App.css'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [title, setNewTitle] = useState('')
  const [author, setNewAuthor] = useState('')
  const [url, setNewUrl] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [alertMessage, setAlertMessage] = useState(null)
  const [isAlert, setAlert] = useState(false)

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
      setAlertMessage(`a new blog ${title} by ${author} added`)
      setAlert(false)
      setTimeout(() => {
        setAlertMessage(null)
      }, 5000)

      setNewTitle('')
      setNewAuthor('')
      setNewUrl('') 
    }
  
  

  const handleLogin = async (event) => {
    event.preventDefault()
    //console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password
      })
      setUser(user)
      
      if(user !== null) {
        console.log(user)
        window.localStorage.setItem(
          'loggedBlogappUser', JSON.stringify(user)
        )
        blogService.setToken(user.token)
        //setUser(user)
        setUsername('')
        setPassword('')
        setAlertMessage(`${username} logged in`)
        setAlert(false)
      } else {
        
        console.log("else: " + user)
        
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
      setAlertMessage("wrong credentials")
      setAlert(true)  
      setTimeout(() => {
        setAlertMessage(null)
        setAlert(false)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    window.localStorage.clear()
    setUser(null)
  }

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
      <button onClick={handleLogout}>logout</button>
      
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