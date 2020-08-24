import React, { useState } from 'react';

const Header = (props) => {
  return(
    <h1>{props.course.name}</h1>
  )
}

const Content = (props) =>  {
  return(
    <ul>
        {props.content.map(p =>  
            <Part key={p.id} style={p.style ? p.style : null} text={p.text} value={p.value}/>
        )}
    </ul>  

  )  
    
}

const Part = (props) =>  {
  //console.log(props)
  return (
    <p style={props.style} >{props.text} {props.value}</p>
  )
}

const Course = ({course}) => {
    console.log('course ', course)
    const total = {
        id: 'total',
        text: 'Number of exercises', 
        value: course.parts.reduce((s, p) => s + p.exercises, 0) + ' exercises',
        style: {fontWeight: 'bold'} 
    } 
    const content = course.parts.map(e => {
        return({id: e.id, text: e.name, value: e.exercises})
    })
    content.push(total)
    console.log('content ', content)

    return (
        <div>
            <Header course={course} />  
            <Content content={content} />
        </div>
    )
}

export default Course;