import { useSelector, useDispatch } from 'react-redux'

//const dispatch = useDispatch()

const notificationReducer = (state = '', action) => {
  console.log(action)
    switch (action.type) {
      case 'SET_NOTIFICATION':
        return action.notification
      case 'OFF_NOTIFICATION':
        return action.notification
      default:
        return state
    }
  }
  
export const setNotification = (notification, time) => {
  return async dispatch => {
    await dispatch({
      type: 'SET_NOTIFICATION',
      notification,
    })
    setTimeout(() => {dispatch(clearNotification())}, time)
  }
}

const clearNotification = () => {
  console.log('clear notif called')
  return {
    type: 'OFF_NOTIFICATION',
    notification: null,
  }
}

export default notificationReducer