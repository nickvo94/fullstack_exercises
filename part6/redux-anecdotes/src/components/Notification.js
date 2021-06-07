import React from 'react'
import { useSelector } from 'react-redux'


const Notification = () => {
  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    margin: 10,
    borderWidth: 1,
    display: 'block',
    color: 'blue'
  }
  return (
    <div>
      <div style={ notification ? style : {display: 'none'}}>
        {notification}
      </div>
    </div>
  )
}

export default Notification