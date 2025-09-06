import React from 'react'

const FilterInput = ({ filter, onFilterChange }) => {
  return (
    <div className='filter'>
      <label htmlFor='filter'>Filter:</label>
      <input
        id='filter'
        type='text'
        value={filter}
        placeholder='Type to filter coins...'
        onChange={(e) => onFilterChange(e.target.value)}
      />
    </div>
  )
}

export default FilterInput
