import React from 'react'
import PropTypes from 'prop-types'

import SerialPort from 'serialport'
import Readline from '@serialport/parser-readline'

import './style.css'

export default class Arduino extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      reading: ''
    }
    // Setup the port
    this.serialPort = new SerialPort(this.props.arduino.comName, {
      baudRate: 9600
    })
    // Setup parser
    let lineStream = this.serialPort.pipe(new Readline({ delimiter: '\r\n' }))
    // On new line
    lineStream.on('data', (data) => {
      this.setState({ reading: data })
    })
    // On disconnect
    this.serialPort.on('close', () => {
      this.setState({ reading: 'Disconnected' })
    })
  }

  componentWillUnmount () {
    this.serialPort.close()
  }

  render () {
    return (
      <p>
        Arduino on { this.props.arduino.comName } with serial number { this.props.arduino.serialNumber }:<br />
        { this.state.reading }
      </p>
    )
  }
}

Arduino.propTypes = {
  arduino: PropTypes.object
}
