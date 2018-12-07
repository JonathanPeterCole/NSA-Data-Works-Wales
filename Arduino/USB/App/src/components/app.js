import React from 'react'
import SerialPort from 'serialport'
import { CSSTransition } from 'react-transition-group'

import Titlebar from './titlebar/titlebar'
import Searching from './searching/searching'
import ArduinoList from './arduino-list/arduino-list'

import './style.css'
import 'typeface-quicksand'
import AppIcon from './icon.svg'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      arduinos: []
    }
    // Bindings
    this.searchDevices = this.searchDevices.bind(this)
    this.deviceDisconnected = this.deviceDisconnected.bind(this)
    // Search for a new device every 2 seconds
    this.searchInterval = setInterval(this.searchDevices, 2000)
  }

  searchDevices () {
    // Get a list of the serial devices
    SerialPort.list().then((result) => {
      // Get all devices with a matching manufacturer
      let arduinos = result.filter((device) => {
        return device.manufacturer.toLowerCase().includes('arduino')
      })
      // Set the Arduino state
      if (arduinos.length > 0) {
        this.setState({ arduinos: arduinos })
      } else {
        this.setState({ arduinos: [] })
      }
    })
  }

  deviceDisconnected () {
    // Reset the search interval to keep disconnected devices on screen for 2 seconds
    clearInterval(this.searchInterval)
    this.searchInterval = setInterval(this.searchDevices, 2000)
  }

  render () {
    return (
      <div className='main'>
        <Titlebar title='Data Works USB Link' icon={AppIcon} />
        <div className='container'>
          <CSSTransition
            in={this.state.arduinos.length === 0}
            classNames='transition-fade'
            timeout={{ enter: 300, exit: 0 }}
            unmountOnExit>
            <Searching />
          </CSSTransition>
          <CSSTransition
            in={this.state.arduinos.length > 0}
            classNames='transition-fade'
            timeout={{ enter: 300, exit: 0 }}
            unmountOnExit>
            <ArduinoList arduinos={this.state.arduinos} disconnected={this.deviceDisconnected} />
          </CSSTransition>
        </div>
      </div>
    )
  }
}
