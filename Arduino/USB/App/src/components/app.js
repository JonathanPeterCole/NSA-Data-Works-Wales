import React from 'react'

import SerialPort from 'serialport'

import Arduino from './arduino/arduino'

import './style.css'
import 'typeface-quicksand'

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
      <div>
        <h2>
          Available Arduinos: {this.state.arduinos.length}
        </h2>
        {this.state.arduinos.map((arduino, key) => (
          <Arduino key={key} arduino={arduino} />
        ))}
      </div>
    )
  }
}
