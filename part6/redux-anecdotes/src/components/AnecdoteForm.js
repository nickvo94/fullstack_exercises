import React from 'react'
import { useDispatch } from 'react-redux'
import {createAnecdote} from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdotes'
import {setNotification} from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    //console.log('vote', id)
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.value = ''
    //const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(content)).
      then(
        dispatch(setNotification(`new anecdote '${content}'`, 5000))
      )
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote} >
        <div><input name='anecdote' /></div>
        <button>create</button>
      </form>  
    </div>
  )
}

export default AnecdoteForm