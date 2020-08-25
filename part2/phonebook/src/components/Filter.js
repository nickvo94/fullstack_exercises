import React from 'react'

const Filter = ({handleSearch}) => {
  return <input type="text" placeholder="Search.." onChange={handleSearch} />
}

export default Filter