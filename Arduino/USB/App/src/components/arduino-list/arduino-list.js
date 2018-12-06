import React from 'react'
import PropTypes from 'prop-types'

import Arduino from '../arduino/arduino'

export default class ArduinoList extends React.Component {
  render () {
    return (
      <div className='arduino-list'>
        <h2>
          Available Arduinos: {this.props.arduinos.length}
        </h2>
        {this.props.arduinos.map((arduino, key) => (
          <Arduino key={key} arduino={arduino} />
        ))}
      </div>
    )
  }
}

ArduinoList.propTypes = {
  arduinos: PropTypes.array
}
