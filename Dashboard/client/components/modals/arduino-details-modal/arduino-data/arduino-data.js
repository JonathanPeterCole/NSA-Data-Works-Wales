import React from 'react'
import PropTypes from 'prop-types'

import TemperatureIcon from './img/temperature.svg'
import MoistureIcon from './img/moisture.svg'
import LightIcon from './img/light.svg'

import Temperature from '../../../formats/Temperature'

import './style.css'

export default class ArduinoData extends React.Component {
  constructor (props) {
    super(props)
    console.log('Reading')
    console.log(props)
    this.options = {
      build: ['withBackground', 'withGridLines', 'withLine', 'withHoverLine', 'withInfo', 'withImage', 'withActive'],
      outerPadding: { top: 0, bottom: 0, left: 0, right: 0 },
      innerPadding: { top: 8, bottom: 8, left: 0, right: 0 },
      fontsize: 14,
      type: props.sensor.type,
      name: this.getImage(props.sensor.id, props.sensor.type),
      active: props.sensor.online,
      aesthetics: {
        gridLines: { border: false, width: 1 }
      }
    }
  }
  componentDidUpdate () {
    this.options = {
      ...this.options,
      type: this.props.sensor.type,
      name: this.getName(this.props.sensor.id, this.props.sensor.type),
      active: this.props.sensor.online
    }
  }
  getName (id, type) {
    return type.charAt(0).toUpperCase() + type.slice(1) + ' ' + id
  }
  getImage (name) {
    switch (name) {
      case 'temperature':
        return TemperatureIcon
      case 'moisture':
        return MoistureIcon
      case 'light':
        return LightIcon
    }
  }
  render () {
    return (
      <div className='arduinoData'>
        <div className='graph'>
          <Temperature
            options={this.options}
            data={this.props.sensor.readings}
            lastUpdate={this.props.sensor.lastUpdate}
            online={this.props.sensor.online}
          />
        </div>
      </div>
    )
  }
}

ArduinoData.propTypes = {
  sensor: PropTypes.object
}
