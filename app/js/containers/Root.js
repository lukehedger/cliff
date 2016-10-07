import React from 'react'
import * as Components from '../components'

const INTERVAL = 1000

export default class Root extends React.Component {

  static state = {}

  appState(obj) {

    if (typeof obj == "string") return this.state[obj]
    this.setState(obj)

  }

  componentWillMount() {

    this.appState({ time: 0 })

  }

  startTimer(limit, { title, body }, onComplete) {

    const startedAt = Date.now()

    // start timer
    this.timer = setInterval( () => {

      // get time
      let now = ( Date.now() - startedAt )

      console.log(now)

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

    // reset time
    this.appState({ now: 0 })

  }

  work() {

    // start 20 minute timer
    this.startTimer(1200000, { title: 'Work is over', body: '20 minutes up! Rest your eyes' }, this.rest.bind(this))

  }

  rest() {

    // start 20 second timer
    this.startTimer(20000, { title: 'Rest is over', body: '20 seconds up! Back to work' }, this.work.bind(this))

  }

  render() {

    const startTimer = () => this.work()
    const stopTimer = () => this.stopTimer()

    const now = this.appState('now')

    return (
      <div>

        <Components.header />
        <Components.timer time={now} />
        <Components.controls isRunning={now} onStart={startTimer} onStop={stopTimer} />

      </div>
    )

  }

}
