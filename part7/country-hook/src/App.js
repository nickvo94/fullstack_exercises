import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  //console.log(name)

  useEffect(() => {
	axios
	.get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
	.then(response => {
	  //console.log(response)
	  setCountry(response)
	})
	.catch(err => {
		//console.log(err.response)
		setCountry(err.response)
	})
  }, [name])

/* 	const onFetch = () => {
	  setCountry(name)
	} */

	return {
	  country,
	}
}

const Country = ({ country }) => {
	//if(country) console.log(country)
	if (!country) {
		return null
	}

	if (!country.data[0]) {
		return (
			<div>
			not found...
			</div>
		)
	}

	return (
	<div>
		<h3>{country.data[0].name} </h3>
		<div>capital {country.data[0].capital} </div>
		<div>population {country.data[0].population}</div> 
		<img src={country.data[0].flag} height='100' alt={`flag of ${country.data[0].name}`}/>  
	</div>
	)
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
	//console.log('fetch is called ...')
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country {...country} />
    </div>
  )
}

export default App
