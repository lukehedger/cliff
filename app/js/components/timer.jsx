import React from 'react'

const Component = ({ isResting, isWorking, time }) => {

  const renderLabel = isResting ? 'Rest' : isWorking ? 'Work' : null

  return (
    <div>
      Time: { time }
      { renderLabel }
    </div>
  )

}

export default Component
