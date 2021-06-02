import { useSelector, useDispatch } from 'react-redux'
import React from 'react'
import filterReducer from '../reducers/filterReducer'

const AnecdoteList = ({vote}) => {
  const anecdotes = useSelector(({filter, anecdotes}) => {
    if (filter) {
      console.log('in anecdote list, filter is ' , filter, ' anecdote is ', anecdotes )
      return anecdotes.filter(anecdote => anecdote.content.includes(filter) )
    }
    else {
      return anecdotes
    }

  }) 

  return (
    <div>
        <br/>
        {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
            <div>
            {anecdote.content}
            </div>
            <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
        </div>
        )}      
    </div>
  )
}

export default AnecdoteList