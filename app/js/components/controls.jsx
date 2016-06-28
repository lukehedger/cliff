import React from 'react'

const Component = ({ onStart, onStop }) => {

  return (
    <div>
      <button onClick={onStart}>Start</button>
      <button onClick={onStop}>Stop</button>
    </div>
  )

}

export default Component
