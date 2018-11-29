import React from 'react'
import PropTypes from 'prop-types'
import timeago from 'timeago.js'

import './style.css'

export default class StatusIndicator extends React.Component {
  constructor (props) {
    super(props)
    // Bindings
    this.getStatusText = this.getStatusText.bind(this)
    this.getStatusLightClass = this.getStatusLightClass.bind(this)
  }
  getStatusText () {
    if (this.props.online) {
      return 'Online'
    } else {
      return 'Last online ' + timeago().format(this.props.lastConnection)
    }
  }
  getStatusLightClass () {
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
