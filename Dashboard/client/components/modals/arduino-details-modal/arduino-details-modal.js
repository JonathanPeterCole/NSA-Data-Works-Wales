import React from 'react'
import PropTypes from 'prop-types'

import Modal from '../modal/modal'
import ModalHeader from '../modal/modal-header/modal-header'
import ModalContent from '../modal/modal-content/modal-content'
import StatusIndicator from '../../status-indicator/status-indicator'
import ArduinoData from './arduino-data/arduino-data'

import TemperatureIcon from './img/temperature.svg'
import MoistureIcon from './img/moisture.svg'
import LightIcon from './img/light.svg'

import './style.css'

export default class ArduinoDetailsModal extends React.Component {
  constructor (props) {
    super(props)
    console.log('lol')
    console.log(props)
    this.state = {
      currentSensor: 0,
      refresh: false
    }
  }
  getImage (name) {
    switch (name) {
      case 'temp':
        return TemperatureIcon
      case 'moisture':
        return MoistureIcon
      case 'light':
        return LightIcon
    }
  }
  componentDidUpdate () {
  }
  changeSensor (sensor) {
    this.setState({ currentSensor: sensor })
  }
  refresh () {
    this.setState({ refresh: !this.state.refresh })
    console.log(this.state.refresh)
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
                <div className='btn' key={i} onClick={() => { this.changeSensor(i); this.refresh() }}>
                  <img className='icon' src={this.getImage(sensor.type)} /><span className='label'>{sensor.name}</span>
                </div>)
            })}
          </div>
          <ArduinoData
            sensor={this.props.data.sensors[this.state.currentSensor]}
            redraw={this.state.refresh} // TODO: figure out a way to redraw on sensor change
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
