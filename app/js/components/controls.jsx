import React from 'react'
import { Button } from 'css/button.react.css'

const Component = ({ isRunning, onStart, onStop }) => {

  return (
    <div>

      <button onClick={ isRunning ? onStop : onStart }>
        { isRunning ? 'Stop' : 'Start' }
      </button>

    </div>
  )

}

export default Component
