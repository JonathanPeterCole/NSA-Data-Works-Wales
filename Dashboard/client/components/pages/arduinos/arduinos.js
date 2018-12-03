import React from 'react'
import io from 'socket.io-client'

import Arduino from './arduino/arduino'
import ArduinoDetailsModal from '../../modals/arduino-details-modal/arduino-details-modal'

import './style.css'

import arduinoData from './mock-data.json'

export default class Arduinos extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      arduinos: [],
      showModal: false
    }
    // Bindings
    this.showModal = this.showModal.bind(this)
    this.hideModal = this.hideModal.bind(this)
    this.socket = io('/websocket')
    this.socket.on('sensorReadings', (data) => {
      this.setState({
        arduinos: data
      })
    })
  }
  showModal () {
    this.setState({
      showModal: true
    })
  }
  hideModal () {
    this.setState({
      showModal: false
    })
  }


  updateSensor (id, name) {
    this.socket.emit('updateSettings', {
      id: id,
      name: name
    })
  }
  render () {
    return (
      <div className='arduinos'>
        <h1>Your Arduino's</h1>
        <div className='arduinos-container'>
          {this.state.arduinos.map((arduino, i) => (
            <Arduino
              key={i}
              name={arduino.name}
              colour={arduino.colour}
              online={arduino.online}
              lastConnection={arduino.lastConnection}
              sensors={arduino.sensors}
              onClick={this.showModal} />
          ))}
        </div>
        <ArduinoDetailsModal show={this.state.showModal} close={this.hideModal} />
      </div>
    )
  }
}
