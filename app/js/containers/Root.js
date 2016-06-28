const React = require('react')

import * as Components from '../components'

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

    let startedAt = performance.now()

    const timer = () => {

      // tick rAF
			this.timerRequest = requestAnimationFrame(timer)

      // get time
			let now = performance.now() - startedAt

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

    }

    // start rAF
		this.timerRequest = requestAnimationFrame(timer)

  }

  stopTimer() {

    // cancel rAF
    cancelAnimationFrame(this.timerRequest)
    this.timerRequest = undefined

    // reset time
    this.appState({ now: 0 })

  }

  twentyMinutes() {

    // start 20 minute timer
    this.startTimer(1200000, { title: '20 minutes', body: '20 minutes up!' }, this.twentySeconds.bind(this))

  }

  twentySeconds() {

    // start 20 second timer
    this.startTimer(20000, { title: '20 seconds', body: '20 seconds up!' }, this.twentyMinutes.bind(this))

  }

  render() {

    const startTimer = () => this.twentyMinutes()
    const stopTimer = () => this.stopTimer()

    const now = this.appState('now')

    return (
      <div>

        <Components.header />
        <Components.timer time={now} />
        <Components.controls onStart={startTimer} onStop={stopTimer} />

      </div>
    )

  }

}
