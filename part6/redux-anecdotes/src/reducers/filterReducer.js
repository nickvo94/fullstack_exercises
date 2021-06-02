const filterReducer = (state = '', action) => {
  console.log(action)
    switch (action.type) {
      case 'START_FILTER':
        return action.filter
      default:
        return state
    }
  }
  
export const startFilter = (filter) => {
  return {
    type: 'START_FILTER',
    filter
  }
}

export default filterReducer