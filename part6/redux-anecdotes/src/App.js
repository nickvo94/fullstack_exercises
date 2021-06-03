import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote, addAnecdote } from './reducers/anecdoteReducer'
import {notificationChange, notificationOff} from './reducers/notificationReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import anecdoteService from './services/anecdotes'
import {initializeAnecdotes} from './reducers/anecdoteReducer'

const App = () => {
  //const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()

  useEffect(() => {
    anecdoteService
      .getAll().then(anecdotes => dispatch(initializeAnecdotes(anecdotes)))
  }, [dispatch])

  const vote = (id) => {
    console.log('vote', id)
    dispatch(addVote(id))
    dispatch(notificationChange('add vote'))
    setTimeout(() => {dispatch(notificationOff({}))},5000)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter/>
      <AnecdoteList vote={vote} />
      <Notification />
      <AnecdoteForm />
    </div>
  )
}

export default App