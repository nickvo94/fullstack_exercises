import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({text}) => {
  return(
  <h1>{text}</h1>
  )
}

const Button = ({handleClick,text}) => {
  return(
  <button onClick={handleClick}>{text}</button>
  )
}

const Statistic = (props) => {
  /// ...
  return(
    <tr>
      <td>{props.text} : </td>
      <td>{props.value}</td>     
    </tr>
  )
}

const Statistics = (props) => {
  let {good, neutral, bad} = props.states
  console.log(good)
  /// ...
  if(good === 0 && neutral === 0 && bad === 0){
    return(
      <div>
        No feedback given
      </div>
    )
  }
  else {
    let all = good + neutral + bad
    let average = (good - bad) / all
    let positive = good / all * 100

    return(
      <div>
        <table>
          <tbody>
            <Statistic text="good" value ={good} />
            <Statistic text="neutral" value ={neutral} />
            <Statistic text="bad" value ={bad} />
            <Statistic text="all" value ={all} />
            <Statistic text="average" value ={average} />
            <Statistic text="positive" value ={positive + " %"} />
          </tbody>
        </table>
      </div>
    )

  }
  
}

const App = () => {
  // save clicks of each button to own state
  const headers = {
      feedback : 'give feedback',
      statistics: 'statistics',
    }

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const buttons = {
    good : {
      text: 'good',
      eventHandler: () => {setGood(good+1)}
    },
    neutral : {
      text: 'neutral',
      eventHandler: () => {setNeutral(neutral+1)}
    },
    bad : {
      text: 'bad',
      eventHandler: () => {setBad(bad+1)}
    },
  }

  const states = {good: good, neutral: neutral, bad: bad}

  return (
    <div>
      <Header text={headers.feedback}/>
      <Button handleClick={buttons.good.eventHandler} text={buttons.good.text}/>
      <Button handleClick={buttons.neutral.eventHandler} text={buttons.neutral.text}/>
      <Button handleClick={buttons.bad.eventHandler} text={buttons.bad.text}/>
      <Header text={headers.statistics}/>
      <Statistics states={states}/>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

