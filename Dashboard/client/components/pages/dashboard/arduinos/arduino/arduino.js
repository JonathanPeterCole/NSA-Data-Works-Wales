import React from 'react'
import PropTypes from 'prop-types'

import Reading from './reading/reading'
import StatusIndicator from '../../../../status-indicator/status-indicator'

import './style.css'

export default class Arduino extends React.Component {
  constructor (props) {
    super(props)
    // Bindings
    this.getBoxClassName = this.getBoxClassName.bind(this)
    console.log(props)
  }
  getBoxClassName () {
    return 'box ' + this.props.colour
  }
  componentDidUpdate () {

  }
  getSensorName (id, type) {
    return type.charAt(0).toUpperCase() + type.slice(1) + ' ' + id
  }
  render () {
    return (
      <div className='arduino'>
        <div className={this.getBoxClassName()} onClick={this.props.onClick}>
          <div className='arduino-header'>
            <div className='title'>
              {this.props.name}
            </div>
            <StatusIndicator online={this.props.online} lastConnection={this.props.lastConnection} />
          </div>
          <div className='arduino-readings'>
            {this.props.sensors.map((sensor, i) => {
              return (
                <Reading
                  lastUpdate={sensor.lastUpdate}
                  key={sensor.id}
                  type={sensor.type}
                  online={sensor.online}
                  readings={sensor.readings}
                  name={this.getSensorName(sensor.id, sensor.type)} />
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

Arduino.propTypes = {
  name: PropTypes.string,
  colour: PropTypes.string,
  online: PropTypes.bool,
  lastConnection: PropTypes.number,
  sensors: PropTypes.array,
  onClick: PropTypes.func
}
