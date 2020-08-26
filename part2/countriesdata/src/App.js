import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CountriesDisplay from './components/CountriesDisplay'

const App = () => {
  
  const [ allCountries, setAllCountries ] = useState([])
  const [ filteredCountries, setFilteredCountries ] = useState([])
  const [ newSearch, setNewSearch ] = useState('')
  const [ show, setShow ] = useState(false)

  useEffect( () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        //console.log(response.data)
        setAllCountries(response.data)
        setFilteredCountries(response.data)
      })

  }, [])
  

  const handleOnSearch = (event) => {
    const search = event.target.value
    setNewSearch(search)
    const countries = allCountries.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
    //console.log(countries)
    setFilteredCountries(countries)
  }

  const handleShow = (selectedCountry)  => {
    //console.log(selectedCountry)
    setShow(!show)
    setFilteredCountries(selectedCountry)
  }

  return(
    <div style={{margin:'10px'}}>
      find countries:  
        <input value={newSearch} 
          onChange={handleOnSearch} 
          type="text" placeholder="Search.."
        />
        <CountriesDisplay countries={filteredCountries} showFunction={handleShow}/>
    </div>
  )

}

export default App;
