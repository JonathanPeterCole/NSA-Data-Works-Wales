import React from 'react'
import PropTypes from 'prop-types'

import Modal from '../modal/modal'
import ModalHeader from '../modal/modal-header/modal-header'
import ModalContent from '../modal/modal-content/modal-content'
import StatusIndicator from '../../status-indicator/status-indicator'
import ArduinoData from './arduino-data/arduino-data'

import Temperature from './img/temperature.svg'

import './style.css'

export default class ArduinoDetailsModal extends React.Component {
  constructor (props) {
    super(props)
    console.log(props)
    this.state = {
      currentSensor: props.data.sensors[0]
    }
  }
  getImage (name) {
    switch (name) {
      case 'temp':
        return Temperature
    }
  }
  componentDidUpdate () {
    console.log(this.props)
  }
  changeSensor (sensor) {
    this.setState({ currentSensor: sensor })
  }
  render () {
    return (
      <Modal className='arduino-details' show={this.props.show} close={this.props.close}>
        <div className='arduino-colour blue' />
        <ModalHeader close={this.props.close}>
          <h1>{this.props.data.name}</h1>
          <StatusIndicator online={this.props.data.online} lastConnection={this.props.data.lastUpdate} />
        </ModalHeader>
        <ModalContent>
          <div className='sensor-bar'>
            {this.props.data.sensors.map((sensor, i) => {
              return (
                <div className='btn' key={i} onClick={() => { this.changeSensor(sensor) }}>
                  <img className='icon' src={this.getImage(sensor.type)} /><span className='label'>{sensor.name}</span>
                </div>)
            })}
          </div>
          <ArduinoData
            sensor={this.state.currentSensor}
          />
        </ModalContent>
      </Modal>
    )
  }
}

ArduinoDetailsModal.propTypes = {
  data: PropTypes.object,
  show: PropTypes.bool,
  close: PropTypes.func
}
