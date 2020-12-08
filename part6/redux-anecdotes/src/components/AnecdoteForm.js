import React from 'react'

const AnecdoteForm = ({createAnecdote}) => {

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createAnecdote} >
        <div><input name='anecdote' /></div>
        <button>create</button>
      </form>  
    </div>
  )
}

export default AnecdoteForm