import React from 'react'

const Filter = ({handleSearch}) => {
  return (
    <div>
      Filter with name: <input type="text" placeholder="Search.." onChange={handleSearch} />
    </div>
  ) 
}

export default Filter