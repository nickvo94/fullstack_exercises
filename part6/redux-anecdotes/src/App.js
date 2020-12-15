import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote, addAnecdote } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'

const App = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(addVote(id))
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
      <AnecdoteForm createAnecdote={createAnecdote} />
      <AnecdoteList anecdotes={anecdotes} vote={vote} />
      <Notification />
    </div>
  )
}

export default App