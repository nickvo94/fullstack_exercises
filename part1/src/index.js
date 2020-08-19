import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Header = (props) => {
  return(
    <h1>{props.course}</h1>
  )
}

const Content = (props) =>  {
  return (
    <div>
      <Part part={props.parts.part1} exercise={props.exercises.exercises1}/>
      <Part part={props.parts.part2} exercise={props.exercises.exercises2}/>
      <Part part={props.parts.part3} exercise={props.exercises.exercises3}/>
    </div>
  )
}

const Part = (props) =>  {
  console.log(props)
  return (
    <>
      <p>
        {props.part} {props.exercise}
      </p>
    </>
  )
}

const Total = (props) =>  {
  console.log(props)
  return (
    <>
      <p>
        Number of exercises {props.total}
      </p>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = {
    part1 : 'Fundamentals of React',
    part2 : 'Using props to pass data',
    part3 : 'State of a component'
  }
  const exercises = {
    exercises1 : 10,
    exercises2 : 7,
    exercises3 : 14
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} exercises={exercises} />
      <Total total= {exercises.exercises1 + exercises.exercises2 + exercises.exercises3}/>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
