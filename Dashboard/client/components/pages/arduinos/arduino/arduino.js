import React from 'react'
import PropTypes from 'prop-types'

import Reading from './reading/reading'
import StatusIndicator from '../../../status-indicator/status-indicator'

import './style.css'

export default class Arduino extends React.Component {
  constructor (props) {
    super(props)
    // Bindings
    this.getBoxClassName = this.getBoxClassName.bind(this)
  }
  getBoxClassName () {
    return 'box ' + this.props.colour
  }
  render () {
    return (
      <div className='arduino'>
        <div className={this.getBoxClassName()} onClick={this.props.onClick}>
          <div className='arduino-header'>
            <div className='title'>
              Placeholder Name
            </div>
            <StatusIndicator online={false} lastConnection={new Date()} />
          </div>
          <div className='arduino-readings'>
            <Reading type='temperature' reading='4' />
            <Reading type='light' reading='24' />
            <Reading type='moisture' reading='43' />
          </div>
        </div>
      </div>
    )
  }
}

Arduino.propTypes = {
  colour: PropTypes.string,
  onClick: PropTypes.func
}
