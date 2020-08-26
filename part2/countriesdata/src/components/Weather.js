import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({country}) => {
  const weather_api_key = process.env.REACT_APP_API_KEY
  const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?`+
                    `q=${country.capital}&appid=${weather_api_key}&units=metric`
  const [ weather, setWeather ] = useState({})
  //console.log(weather_api_key)
  useEffect(() => {
    axios
      .get(weatherUrl)
      .then((response) => {
        setWeather(response.data)
        //console.log(response.data)
      })
  }, [])
  //console.log(weather);

  return (
    <div>
      <h3>Weather in {country.capital}: </h3>
      { Object.keys(weather).length !== 0 ?
        <div>        
            <div>temperatue : {weather.main.temp} C</div>
            <div>humidity : {weather.main.humidity} %</div>
            <div>wind : {weather.wind.speed} mps</div> 
            <img 
            src={'http://openweathermap.org/img/wn/'+ weather.weather[0].icon + '@2x.png'} 
            alt="weather images" width="100"
            /> 
        </div>  
      : 'no weather' }
    </div>
  )
}

export default Weather