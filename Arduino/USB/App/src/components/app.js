import React from 'react'

import SerialPort from 'serialport'

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
    this.searchInterval = null
    this.startSearch()
  }

  startSearch () {
    this.searchInterval = setInterval(() => {
      SerialPort.list().then((result) => {
        let arduinos = result.filter((device) => {
          return device.manufacturer.toLowerCase().includes('arduino')
        })
        if (arduinos.length > 0) {
          this.setState({ arduinos: arduinos })
        } else {
          this.setState({ arduinos: [] })
        }
      })
    }, 1000)
  }

  render () {
    return (
      <div className='main'>
        <Titlebar title='Data Works USB Link' icon={AppIcon} />
        <div className='container'>
          { this.state.arduinos.length === 0 &&
            <Searching />
          }
          { this.state.arduinos.length > 0 &&
            <ArduinoList arduinos={this.state.arduinos} />
          }
        </div>
      </div>
    )
  }
}
