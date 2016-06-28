import React from 'react'
import { Button } from 'css/button.react.css'

const Component = ({ onStart, onStop }) => {

  return (
    <div>
      <Button onClick={onStart}>Start</Button>
      <button onClick={onStop}>Stop</button>
    </div>
  )

}

export default Component
