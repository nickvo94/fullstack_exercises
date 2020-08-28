import React from 'react'

const PersonForm = ({formComponents}) => {
  const inputStyle = {marginLeft: '10px'}
  return (
    <form onSubmit={formComponents.addName}>
        <div>
          name: 
            <input value={formComponents.newName} style={inputStyle}
                  onChange={formComponents.handleNameChange} />
        </div>
        <div>
          number: 
          <input value={formComponents.newNumber} style={inputStyle}
                onChange={formComponents.handleNumberChange} />
        </div>
        <div><button type="submit">add</button></div>
      </form>
  )
}

export default PersonForm