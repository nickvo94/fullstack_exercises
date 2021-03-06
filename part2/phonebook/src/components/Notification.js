import React from 'react'

const Notification = ({ message }) => {
    console.log('message...' , message)
    if (message === null) {
        return null
    }

    return (
        <div className={message.class}>
        {message.text}
        </div>
    )
}

export default Notification