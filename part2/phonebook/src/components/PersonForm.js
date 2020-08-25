import React from 'react'

const PersonForm = ({formComponents}) => {
  return (
    <form onSubmit={formComponents.addName}>
        <div>
          name: 
            <input value={formComponents.newName} 
                  onChange={formComponents.handleNameChange} />
        </div>
        <div>
          number: 
          <input value={formComponents.newNumber} 
                onChange={formComponents.handleNumberChange} />
        </div>
        <div><button type="submit">add</button></div>
      </form>
  )
}

export default PersonForm