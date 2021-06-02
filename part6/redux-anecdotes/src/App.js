import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote, addAnecdote } from './reducers/anecdoteReducer'
import {notificationChange, notificationOff} from './reducers/notificationReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'

const App = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(addVote(id))
    dispatch(notificationChange('add vote'))
    setTimeout(() => {dispatch(notificationOff({}))},5000)
  }

  const createAnecdote = (event) => {
    //console.log('vote', id)
    event.preventDefault()
    const content = event.target.anecdote.value
    dispatch(addAnecdote(content))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter/>
      <AnecdoteList vote={vote} />
      <Notification />
      <AnecdoteForm createAnecdote={createAnecdote} />
    </div>
  )
}

export default App