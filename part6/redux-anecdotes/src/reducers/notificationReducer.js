const notificationReducer = (state = 'default notification', action) => {
    switch (action.type) {
      case 'SET_NOTIFICATION':
        return action.filter
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
  
  export default notificationReducer