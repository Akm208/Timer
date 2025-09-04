import React from 'react'

const TimerDisplay = ({ time }) => {
  return (
    <div>
       <h2 className='text-2xl font-bold mb-4'>Timer: {time}s</h2>
    </div>
  )
}

export default TimerDisplay
