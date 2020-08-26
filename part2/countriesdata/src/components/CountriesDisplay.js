import React from 'react'
import SingleCountry from './SingleCountry'


const CountriesDisplay = ({countries, showFunction}) => {
  //console.log(countries)
  if (countries) {
    if(countries.length < 11 && countries.length > 1 ){
      return (
        <ul>
          {countries.map(
            c => <div key={c.name}>{c.name} 
                    <button onClick={() => showFunction([c])}>show</button> 
                </div>
          )}
        </ul>
      )
    }
    else if (countries.length > 11) {
      return <div>Too many matches, specify another filter</div>
    }
    else if (countries.length === 1) {
      return <SingleCountry country={countries[0]}/>
    }
  }
  return null
}

export default CountriesDisplay