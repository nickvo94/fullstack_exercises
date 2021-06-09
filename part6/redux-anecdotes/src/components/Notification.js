import React from 'react'
//import { useSelector } from 'react-redux'
import { connect } from 'react-redux'


const Notification = (props) => {
  //const notification = useSelector(state => state.notification)
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
      <div style={props.notification ? style : {display: 'none'}}>
        {props.notification}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification