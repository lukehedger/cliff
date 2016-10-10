import React from 'react'
import * as Components from '../components'

import { INTERVAL, REST, WORK } from '../constants'

export default class Root extends React.Component {

  static state = {}

  appState(obj) {

    if (typeof obj == "string") return this.state[obj]
    this.setState(obj)

  }

  componentWillMount() {

    this.appState({ now: 0, isResting: false, isWorking: false })

  }

  startTimer(limit, { title, body }, onComplete) {

    const startedAt = Date.now()

    // start timer
    this.timer = setInterval( () => {

      // get time -> rounded to nearest 1000 to account for setInterval discrepancies
      let now = Math.round( ( Date.now() - startedAt ) / 1000 ) * 1000

      // update time
			this.appState({ now })

      // check limit
      if (now >= limit) {

        // notify
        new Notification(title, { body })

        // stop current timer
        this.stopTimer()

        // start new timer
        onComplete()

      }

    }, INTERVAL)

  }

  stopTimer() {

    // cancel timer
    clearInterval(this.timer)
    this.timer = undefined

    // reset state
    this.appState({ now: 0, isResting: false, isWorking: false })

  }

  work() {

    const { time, title, body } = WORK

    // set ui state
    this.appState({ isWorking: true })

    // start work timer
    this.startTimer(time, { title, body }, this.rest.bind(this))

  }

  rest() {

    const { time, title, body } = REST

    // set ui state
    this.appState({ isResting: true })

    // start rest timer
    this.startTimer(time, { title, body }, this.work.bind(this))

  }

  render() {

    const startTimer = () => this.work()
    const stopTimer = () => this.stopTimer()

    const now = this.appState('now')
    const isResting = this.appState('isResting')
    const isWorking = this.appState('isWorking')
    const isRunning = isResting || isWorking

    return (
      <div>

        <Components.header />
        <Components.timer time={now} isResting={isResting} isWorking={isWorking} />
        <Components.controls isRunning={isRunning} isResting={isResting} isWorking={isWorking} onStart={startTimer} onStop={stopTimer} />

      </div>
    )

  }

}
