import React from 'react'

const Notification = (props) => {
  const message = props.message
  const isAlert = props.isAlert
  if(message === null) {
    return null
  }
  const className = isAlert ? 'error' : 'notification'
  return (
    <div className = {className}>
      {message}
    </div>
  )
}

export default Notification