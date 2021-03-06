import React from 'react'
import PropTypes from 'prop-types'

import ArduinoConnect from '../../library/arduino-connect/arduino-connect'
import DataWorksAPI from '../../api/data-works-api'

import StatusIndicator from './status-indicator/status-indicator'
import StatusText from './status-text/status-text'

import './style.css'

export default class Arduino extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      status: 'connecting',
      reading: ''
    }
    // Prepare an Arduino Connect instance
    this.connection = new ArduinoConnect()
  }

  componentDidMount () {
    // Prepare Arduino event listeners
    this.connection.on('connected', () => this.setState({ status: 'connected' }))
    this.connection.on('disconnected', () => {
      this.setState({ status: 'disconnected' })
      this.props.disconnected()
    })
    this.connection.on('error', () => this.setState({ status: 'error' }))
    this.connection.on('data', (data) => {
      // Add a Unique Device ID - In this case, the serial number
      data.udid = this.props.arduino.serialNumber
      // Send the data
      this.props.api.sendReading(data)
    })
    // Initialise the connection
    this.connection.connect(this.props.arduino.comName)
  }

  render () {
    return (
      <div className='arduino'>
        <StatusIndicator status={this.state.status} />
        <div className='details'>
          <div className='com-name'>
            { this.props.arduino.comName }
          </div>
          <StatusText status={this.state.status} />
          <div className='serial-number'>
            { this.props.arduino.serialNumber }
          </div>
        </div>
      </div>
    )
  }
}

Arduino.propTypes = {
  arduino: PropTypes.object,
  disconnected: PropTypes.func,
  api: PropTypes.instanceOf(DataWorksAPI)
}
