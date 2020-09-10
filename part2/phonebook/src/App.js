import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    console.log('effect')
    fetchAll()
  }, [])
  console.log('render', persons.length, 'persons')

  const fetchAll = () => {
    personService
      .getAll()
        .then(allPersons => {
          setPersons(allPersons)
        })
  }

  const addName = (event) => {
    event.preventDefault()
    if (newName) {
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
                .catch(error => {
                  handleNotification({class: 'error', text: `${error.response.data.error}`})   
                })
        }
      }
      else {
        personService
          .create(personObj)
            .then(addedPerson => {
              console.log(addedPerson)
              setPersons(persons.concat(addedPerson))
              handleNotification({class: 'success', text: `Added ${addedPerson.name} `})
            })
            .catch(error => {
              console.log('error', error.response.data)
              handleNotification({class: 'error', text: `${error.response.data.error}`})   
            })   
      }
      setNewName('')
      setNewNumber('')
    }
  }

  const deleteName = (event) => {
    console.log(event.target.id)
    const id = event.target.id
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
            .catch(error => {
              console.log('error', error.response.data)
              handleNotification({class: 'error', text: `${error.response.data.error}`})   
            })
    }
  }

  const handleNotification = (message) => {
    if (message) {
      console.log('handle notification...' , message)
      if (message.class === 'error') {
        setNotification(message)
        fetchAll()
      }
      else if (message.class === 'success') {
        setNotification(message)
      }

      setTimeout(() => {
        setNotification(null)
      }, 5000)
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
      <h1>Phonebook</h1>
      <Notification message={notification} />
      <Filter handleSearch={handleSearch}/>
      <h2>Add a new contact</h2>
      <PersonForm formComponents={formComponents}/>
      <h2>Numbers</h2>
      <Persons contacts={contactToShow} handleDelete={deleteName}/>
    </div>
  )
}

export default App