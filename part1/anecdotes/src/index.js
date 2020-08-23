import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => {
  return(
    <button onClick={handleClick}>{text}</button>
  )
}

const Vote = ({value}) => {
  //console.log("value", value)
  return(
    <div>
      has {value} vote(s)
    </div>
  )
}

const AnecdoteDisplay = ({text, header, value}) => {
  return(
    <div>
      <h1>{header}</h1>
      {text}
      <Vote value={value}/>
      <br></br>
    </div>
  )
}

const MostVotedAnecdote = ({anecdotes, voted}) => {  
  const maxVote = Math.max(...voted)
  let maxVoteIdx = 0;
  if (maxVote !== 0) {
     maxVoteIdx = voted.indexOf(maxVote); 
     return (
        <AnecdoteDisplay 
          text={anecdotes[maxVoteIdx]} 
          header={'Anecdote with most votes'} 
          value={maxVote}
        />
      );
  }
  return (
    <div>
      <br></br>
      There are no vote yet
    </div>
  );
}

const App = (props) => {
  //const points = [1, 4, 6, 3]
  const points = new Array(props.anecdotes.length + 1).join('0').split('').map(parseFloat) 

  const [selected, setSelected] = useState(0)
  const [voted, setVoted] = useState(points)

  const nextAnecdote = () => {
    let rand = getRandomInt(0,5)
    setSelected(rand)
  }

  const handleVote = () => {
    const copyPoints = [...voted];
    copyPoints[selected] += 1
    setVoted(copyPoints)
    //console.log("selected",selected, voted)
  }

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

  return (
    <div>
        <AnecdoteDisplay 
          text={props.anecdotes[selected]} 
          header={'Anecdote of the day'} 
          value={voted[selected]}
        />
        <Button handleClick={nextAnecdote} text="next"/>
        <Button handleClick={handleVote} text="vote"/>
        <MostVotedAnecdote anecdotes={props.anecdotes} voted={voted}/>
    </div> 
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <React.StrictMode>
    <App anecdotes={anecdotes} />
  </React.StrictMode>,
  document.getElementById('root')
);
