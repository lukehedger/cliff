import React from 'react'
import { Timer } from 'css/timer.react.css'

const Component = ({ isResting, isWorking, limit, time }) => {

  const renderLabel = isResting ? 'Rest' : isWorking ? 'Work' : null
  const style = {
    opacity: ( time / limit )
  }

  return (
    <Timer style={style} />
  )

}

export default Component
