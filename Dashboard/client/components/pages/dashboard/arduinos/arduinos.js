import React from 'react'
import io from 'socket.io-client'
import PropTypes from 'prop-types'
import axios from 'axios'

import Arduino from './arduino/arduino'
import ArduinoDetailsModal from '../../../modals/arduino-details-modal/arduino-details-modal'

import './style.css'

export default class Arduinos extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      arduinos: [],
      showModal: false,
      modalData: null
    }
    // Bindings
    this.showModal = this.showModal.bind(this)
    this.hideModal = this.hideModal.bind(this)
    // Socket IO
    this.socket = io('/websocket')
    this.socket.emit('setUser', JSON.stringify({ jwt: localStorage.getItem('jwt') }))
    this.socket.on('sensorReadings', (data) => {
      console.log(this.state.currentArduino)
      if (!this.state.loaded) {
        this.setState({
          loaded: true,
          arduinos: data
        })
      } else {
        this.setState({
          arduinos: data
        })
      }
    })
  }
  getArduinoData (arduinoid) {
    return axios.get('http://localhost:3000/api/history/' + arduinoid)
  }
  showModal (arduinoid) {
    this.setState({
      showModal: true,
      currentArduino: arduinoid
    })
  }
  hideModal () {
    this.setState({
      showModal: false,
      modalData: null
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
          {this.state.loaded &&
            this.state.arduinos.map((arduino, i) => {
              return (
                <Arduino
                  key={i}
                  name={arduino.name}
                  colour={arduino.colour}
                  online={arduino.online}
                  lastConnection={arduino.lastUpdate}
                  sensors={arduino.sensors}
                  onClick={() => this.showModal(i)} />
              )
            })
          }
        </div>
        {this.state.showModal &&
          <ArduinoDetailsModal data={this.state.arduinos[this.state.currentArduino]} show={this.state.showModal} close={this.hideModal} />
        }
      </div>
    )
  }
}
