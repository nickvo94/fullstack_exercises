import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handelClick, text}) => {
  return(
    <div>
      <button onClick={handelClick}>{text}</button>
    </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)

  const nextAnecdote = () => {
    let rand = getRandomInt(0,5)
    console.log(rand)
    setSelected(rand)
    console.log("select",selected)
  }

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

  return (
    <div>
      {props.anecdotes[selected]}
      <Button handelClick={nextAnecdote} text="next"/>
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
