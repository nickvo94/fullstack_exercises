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
  
export const notificationChange = (notification) => {
  return {
    type: 'SET_NOTIFICATION',
    notification,
  }
}

export const notificationOff = () => {
  return {
    type: 'OFF_NOTIFICATION',
    notification: null,
  }
}

export default notificationReducer