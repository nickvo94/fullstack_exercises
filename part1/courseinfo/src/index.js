import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Header = (props) => {
  return(
    <h1>{props.course.name}</h1>
  )
}

const Content = (props) =>  {
  return(
    props.parts.map(value =>  {
      return(
        <div key={value.name}>
          <Part name={value.name} exercises={value.exercises}/>
        </div>
      )
    })  

  )  
    
}

const Part = (props) =>  {
  //console.log(props)
  return (
    <>
      <p>
        {props.name} {props.exercises}
      </p>
    </>
  )
}

const Total = (props) =>  {
  //console.log(props)
  return (
    <>
      <p>
        Number of exercises {props.parts.reduce((accumulator, currentValue) => {
          return accumulator + currentValue.exercises;
        }, 0)}
      </p>
    </>
  )
}

const App = () => {
   const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  const parts = course.parts;

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts}/>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
