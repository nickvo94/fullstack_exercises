import React from 'react'
import Weather from './Weather'

const SingleCountry = ({country}) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <div>capital: {country.capital}</div>
      <div>population: {country.population}</div>
      <h3>Languages: </h3>
      <ul>{country.languages.map(l => <li key={l.name} >{l.name}</li> )}</ul>
      <img src={country.flag} alt="flag images" width="200"/>
      <Weather country={country} />
    </div>
  )
}

export default SingleCountry