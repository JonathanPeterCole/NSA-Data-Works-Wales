import React from 'react'
import SerialPort from 'serialport'
import { CSSTransition } from 'react-transition-group'
import DataWorksAPI from '../api/data-works-api'

import Titlebar from './titlebar/titlebar'
import Searching from './searching/searching'
import ArduinoList from './arduino-list/arduino-list'
import NetworkStatus from './network-status/network-status'

import './style.css'
import 'typeface-quicksand'
import AppIcon from './icon.svg'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      arduinos: [],
      netStatusConnected: false,
      netStatusShow: true
    }
    // Prepare the API
    this.api = new DataWorksAPI()
    this.api.on('connected', () => this.setNetworkStatus(true))
    this.api.on('disconnected', () => this.setNetworkStatus(false))
    // Bindings
    this.searchDevices = this.searchDevices.bind(this)
    this.deviceDisconnected = this.deviceDisconnected.bind(this)
    this.setNetworkStatus = this.setNetworkStatus.bind(this)
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

  setNetworkStatus (connected) {
    if (connected) {
      this.setState({ netStatusConnected: true })
      // Wait 3 seconds before hiding the network status
      setTimeout(() => {
        // Check that the app is still connected
        if (this.state.netStatusConnected) {
          this.setState({ netStatusShow: false })
        }
      }, 3000)
    } else {
      this.setState({ netStatusConnected: false, netStatusShow: true })
    }
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
            <ArduinoList
              arduinos={this.state.arduinos}
              disconnected={this.deviceDisconnected}
              api={this.api} />
          </CSSTransition>
        </div>
        <NetworkStatus show={this.state.netStatusShow} connected={this.state.netStatusConnected} />
      </div>
    )
  }
}
