import React from 'react'

const Persons = ({contacts}) => {
  return(
    <ul>{contacts.map(contact => <div key={contact.name}>{contact.name} {contact.number}</div>)}</ul>
  ) 
}

export default Persons