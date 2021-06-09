import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote, addAnecdote } from './reducers/anecdoteReducer'
import {setNotification} from './reducers/notificationReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import ConnectedNotification from './components/Notification'
import Filter from './components/Filter'
import anecdoteService from './services/anecdotes'
import {initializeAnecdotes} from './reducers/anecdoteReducer'

const App = () => {
  //const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()

/*   useEffect(() => {
    anecdoteService
      .getAll().then(anecdotes => dispatch(initializeAnecdotes(anecdotes)))
  }, [dispatch]) */

  useEffect(() => {
    dispatch(initializeAnecdotes()) 
  },[dispatch]) 

  const vote = (anecdote) => {
    console.log('vote', anecdote.id)
    dispatch(addVote(anecdote.id)).
      then(
        dispatch(setNotification(`you voted '${anecdote.content}'`, 5000))
      )
    //setTimeout(() => {dispatch(notificationOff({}))},5000)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter/>
      <AnecdoteList vote={vote} />
      <ConnectedNotification />
      <AnecdoteForm />
    </div>
  )
}

export default App