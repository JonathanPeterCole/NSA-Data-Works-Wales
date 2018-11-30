import React from 'react'
import PropTypes from 'prop-types'
import timeago from 'timeago.js'

import './style.css'

export default class StatusIndicator extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      statusText: this.getStatusText()
    }
    // Bindings
    this.getStatusText = this.getStatusText.bind(this)
    this.getStatusLightClass = this.getStatusLightClass.bind(this)
  }
  componentDidMount () {
    // If the Arduino is offline, update the status every second
    if (!this.props.online) {
      this.interval = setInterval(() => this.setState({ statusText: this.getStatusText }), 1000)
    }
  }
  componentDidUpdate (prevProps) {
    // Check if the status has changed
    if (this.props.online !== prevProps.online) {
      // If the Arduino is now offline, update the status every second
      // If the Arduino is now online, clear the interval
      if (!this.props.online) {
        this.interval = setInterval(() => this.setState({ statusText: this.getStatusText }), 1000)
      } else {
        clearInterval(this.interval)
      }
    }
  }
  componentWillUnmount () {
    // Clear the interval on unmount (there's no need to check if the interval is undefined)
    clearInterval(this.interval)
  }
  getStatusText () {
    // Check the status and set the return the appropriate message
    if (this.props.online) {
      return 'Online'
    } else {
      return 'Last online ' + timeago().format(this.props.lastConnection)
    }
  }
  getStatusLightClass () {
    // Determine the colour of the status indicator
    if (this.props.online) {
      return 'status-light online'
    } else {
      return 'status-light offline'
    }
  }
  render () {
    return (
      <div className='arduino-status-indicator'>
        <div className='status-text'>{this.getStatusText()}</div>
        <div className={this.getStatusLightClass()} />
      </div>
    )
  }
}

StatusIndicator.propTypes = {
  online: PropTypes.bool,
  lastConnection: PropTypes.instanceOf(Date)
}
