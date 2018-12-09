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
    // Bindings
    this.connect = this.connect.bind(this)
    // Connect
    this.connect().then((serialPort) => {
      // Set the state to connected
      this.setState({ status: 'connected' })
      // Setup parser
      let lineStream = serialPort.pipe(new Readline({ delimiter: '\r\n' }))
      // Handle new data
      lineStream.on('data', (data) => {
        this.handleData(data)
      })
      // Handle disconnects
      serialPort.on('close', () => {
        this.props.disconnected()
        this.setState({ status: 'disconnected' })
      })
    }, (error) => {
      console.log(error)
      this.setState({ status: 'error' })
    })
  }

  connect () {
    return new Promise((resolve, reject) => {
      // Setup the port
      let serialPort = new SerialPort(
        this.props.arduino.comName, { baudRate: 9600 }, (error) => {
          // If the Serial port cannot be opened, throw an error
          if (error) {
            console.log(error)
            reject(error)
          }
        }
      )
      // Prepare a timeout
      let timeout = setTimeout(() => {
        // If the connection times out, close the port and throw an error
        serialPort.close()
        reject(new Error('Timeout'))
      }, 15000)
      // Setup parser
      let lineStream = serialPort.pipe(new Readline({ delimiter: '\r\n' }))
      // Wait to recieve data
      lineStream.on('data', (data) => {
        try {
          // Parse the data and check if it includes a dataworks object with connect:true
          if (JSON.parse(data).dataworks.connect) {
            // Stop listening for data
            lineStream.removeAllListeners('data')
            // Clear the timeout
            clearTimeout(timeout)
            // Resolve and return the serialPort
            resolve(serialPort)
            // Send an 'okay' message to the arduino
            serialPort.write('okay')
          } else {
            // Stop listening for data
            lineStream.removeAllListeners('data')
            // Reject with error if the JSON isn't valid
            reject(new Error('Device was not recognised. Make sure the USB library is setup correctly.'))
          }
        } catch (error) {
          console.log('Invalid JSON. Waiting for new data...')
        }
      })
    })
  }

  handleData (data) {
    // Attempt to parse the data
    let parsedData
    try {
      parsedData = JSON.parse(data)
    } catch (error) {
      // Catch parsing errors
      this.setState({ status: 'error' })
      return
    }
    // Attempt to get the reading
    if (parsedData.dataworks.sensorReading) {
      // Handle sensor readings
      console.log(parsedData.dataworks.sensorReading)
    }
  }

  render () {
    return (
      <div className='arduino'>
        <StatusIndicator status={this.state.status} />
        <div className='com-name'>
          { this.props.arduino.comName }
        </div>
        <StatusText status={this.state.status} />
        <div className='serial-number'>
          { this.props.arduino.serialNumber }
        </div>
      </div>
    )
  }
}

Arduino.propTypes = {
  arduino: PropTypes.object,
  disconnected: PropTypes.func
}
