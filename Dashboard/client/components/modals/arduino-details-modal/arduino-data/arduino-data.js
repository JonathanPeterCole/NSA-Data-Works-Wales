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
    this.options = {
      build: ['withBackground', 'withGridLines', 'withLine', 'withHoverLine', 'withInfo', 'withActive'],
      padding: { top: 0, bottom: 0, right: 0, left: 0 },
      fontsize: 14,
      name: this.props.sensor.name,
      active: true
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
  render () {
    console.log(this.props.sensor)
    return (
      <div className='arduinoData'>
        <div className='graph'>
          <Temperature
            options={this.options}
            data={this.props.sensor.data}
            lastUpdate={this.props.sensor.lastUpdate}
          />
        </div>

      </div>
    )
  }
}

ArduinoData.propTypes = {
  sensor: PropTypes.object
}
