import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')

  const addName = (event) => {
    event.preventDefault()
    let existed = persons.map(p => p.name.toLowerCase() ).includes(newName.toLowerCase())
    console.log('existed', existed)
    if (existed) {
      window.alert(`${newName} is already added to phonebook`)
    }
    else {
      const personObj = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(personObj))     
    }
    setNewName('')
    setNewNumber('') 
  }
  
  const handleNameChange = (event) => {
    console.log('name...', event.target.value)
    setNewName(event.target.value) 
  }

  const handleNumberChange = (event) => {
    console.log('number...',event.target.value)
    setNewNumber(event.target.value) 
  }

  const handleSearch = (event) => {
    console.log('search...',event.target.value)
    setNewSearch(event.target.value) 
  }

  const formComponents = {
    addName: addName,
    handleNameChange: handleNameChange,
    handleNumberChange: handleNumberChange,
    newName: newName,
    newNumber: newNumber
  }

  const contactToShow = newSearch.length > 0 
    ? persons.filter(p => p.name.toLocaleLowerCase().includes(newSearch.toLowerCase())) 
    : persons 

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleSearch={handleSearch}/>
      <h2>Add a new contact</h2>
      <PersonForm formComponents={formComponents}/>
      <h2>Numbers</h2>
      <Persons contacts={contactToShow}/>
    </div>
  )
}

export default App