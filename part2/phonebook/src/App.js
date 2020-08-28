import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
        .then(allPersons => {
          setPersons(allPersons)
        })      
  }, [])
  console.log('render', persons.length, 'persons')

  const addName = (event) => {
    event.preventDefault()
    const existedPerson = persons.find(p => p.name.includes(newName) ? p : '')
    console.log('existed', existedPerson)

    const personObj = {
      name: newName,
      number: newNumber
    }

    if (existedPerson !== undefined) {
      const confirmed = 
        window.confirm(
          `${newName} is already added to phonebook. Do you want to replace the phone number ?`
        )
      if (confirmed) {
        personService
          .update(existedPerson.id, personObj)
            .then(updatedPerson => {
              setPersons(persons.map(p => p.id === existedPerson.id ? updatedPerson : p))
            })
      }
    }
    else {
      personService
        .create(personObj)
          .then(addedPerson => {
            console.log(addedPerson)
            setPersons(persons.concat(addedPerson))
          })   
    }
    setNewName('')
    setNewNumber('') 
  }

  const deleteName = (event) => {
    console.log(event.target.id)
    const id = Number(event.target.id)
    const nameObj = persons.find(p => p.id === id)
    console.log(persons, nameObj)

    let confirmed

    if (nameObj) {
      confirmed = window.confirm(`Delete ${nameObj.name} ?`)
    }

    if(confirmed){
      personService
        .deleteId(id)
          .then(deletedPerson => {
            console.log(deletedPerson)
            if (deletedPerson) {
              const removed = persons.filter(p => p.id !== id)
              setPersons(removed)
            }
          })
    }
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
    ? persons.filter(p => p.name.toLowerCase().includes(newSearch.toLowerCase())) 
    : persons 

  return (
    <div style={{margin: '10px'}}>
      <h2>Phonebook</h2>
      <Filter handleSearch={handleSearch}/>
      <h2>Add a new contact</h2>
      <PersonForm formComponents={formComponents}/>
      <h2>Numbers</h2>
      <Persons contacts={contactToShow} handleDelete={deleteName}/>
    </div>
  )
}

export default App