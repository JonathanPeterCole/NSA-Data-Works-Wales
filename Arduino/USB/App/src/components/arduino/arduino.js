import React from 'react'
import PropTypes from 'prop-types'

import SerialPort from 'serialport'
import Readline from '@serialport/parser-readline'

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
    // Setup the port
    this.serialPort = new SerialPort(
      this.props.arduino.comName, { baudRate: 9600 }, (error) => {
        if (error) {
          console.log(error)
          this.setState({ status: 'error' })
        }
      }
    )
    // Setup parser
    let lineStream = this.serialPort.pipe(new Readline({ delimiter: '\r\n' }))
    // On new line
    lineStream.on('data', (data) => {
      this.setState({
        status: 'connected',
        reading: data
      })
    })
    // On disconnect
    this.serialPort.on('close', () => {
      this.setState({ status: 'disconnected' })
    })
  }

  render () {
    return (
      <div className='arduino'>
        Arduino on { this.props.arduino.comName } with serial number { this.props.arduino.serialNumber }:<br />
        <StatusIndicator status={this.state.status} />
        <StatusText status={this.state.status} />
        { this.state.reading }
      </div>
    )
  }
}

Arduino.propTypes = {
  arduino: PropTypes.object
}
