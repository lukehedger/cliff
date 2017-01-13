import React from 'react'
import { Button } from 'css/button.react.css'

const Controls = ({ isRunning, onStart, onStop }) => {

  const variant = { start: !isRunning, stop: isRunning }

  return (
    <div>

      <Button variant={variant} onClick={ isRunning ? onStop : onStart } />

    </div>
  )

}

export default Controls
