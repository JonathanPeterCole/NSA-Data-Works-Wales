import React from 'react'
import PropTypes from 'prop-types'

import './style.css'

import LightIcon from './img/light.svg'
import MoistureIcon from './img/moisture.svg'
import TemperatureIcon from './img/temperature.svg'

export default class Reading extends React.Component {
  constructor (props) {
    super(props)
    // Bindings
    this.getIcon = this.getIcon.bind(this)
    this.getName = this.getName.bind(this)
    this.getFormattedReading = this.getFormattedReading.bind(this)
  }
  getIcon () {
    switch (this.props.type) {
      case 'temperature':
        return TemperatureIcon
      case 'light':
        return LightIcon
      case 'moisture':
        return MoistureIcon
    }
  }
  getName () {
    return this.props.type.charAt(0).toUpperCase() + this.props.type.slice(1)
  }
  getFormattedReading () {
    let unit = ''
    switch (this.props.type) {
      case 'temperature':
        unit = '°C'
        break
      case 'light':
        unit = ' Lumens'
        break
      case 'moisture':
        unit = '%'
        break
    }
    return this.props.reading + unit
  }
  render () {
    return (
      <div className='arduino-reading'>
        <div className='reading-type'>
          <img className='reading-icon' src={this.getIcon()} />
          <div className='reading-name'>
            {this.getName()}
          </div>
        </div>
        <div className='current-reading'>
          {this.getFormattedReading()}
        </div>
      </div>
    )
  }
}

Reading.propTypes = {
  type: PropTypes.string,
  reading: PropTypes.number
}
