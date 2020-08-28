import React from 'react'

const Persons = ({contacts, handleDelete}) => {
  
  return(
    <ul>
        {contacts.map(contact => 
            <div key={contact.name}>
                {contact.name + ' '} 
                {contact.number + ' '}
                <button id={contact.id} onClick={handleDelete} >delete</button>
            </div>)
        }
    </ul>
  ) 
}

export default Persons