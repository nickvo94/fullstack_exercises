import { useSelector, useDispatch } from 'react-redux'
import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

// not current in use
const initialState = anecdotesAtStart.map(asObject)

//const dispatch = useDispatch()

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type){
    case 'ADD_VOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(a => a.id === id )
      const changedAnecdote = {...anecdoteToChange, votes: action.data.votes}
      return state.map(a => a.id !== id ? a : changedAnecdote ).sort((a, b) => Number(b.votes) - Number(a.votes))
    case 'ADD_ANECDOTE':
      return state.concat(asObject(action.data.content))
    case 'INIT_ANECDOTES':
      return action.data
    case 'NEW_ANECDOTE':
      return [...state, action.data] 
    default:
      return state
  }  
}

export const addVote = (id) => {
  return async dispatch => {
    const response = await anecdoteService.updateVote(id)
    console.log(response)
    dispatch({
      type: 'ADD_VOTE',
      data: response
    })
    
  }
}

//this func not in use anymore
export const addAnecdote = (content) => {
  return {
    type: 'ADD_ANECDOTE',
    data: {content}
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const filterAnecdote = (value) => {
  return {
    type: 'ADD_ANECDOTE',
    filter: {value}
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll() 
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
    //console.log('init anecdotes are  ', anecdotes)
  }
}



export default anecdoteReducer