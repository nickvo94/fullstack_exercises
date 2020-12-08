import React from 'react'

const AnecdoteList = ({anecdotes, vote}) => {

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