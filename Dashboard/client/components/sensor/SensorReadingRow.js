import React from 'react'
import PropTypes from 'prop-types'

export default class SensorReadingRow extends React.Component {
  render () {
    return (
      <tr>
        <td>{this.props.data.time}</td>
        <td>{this.props.data.reading}</td>
      </tr>
    )
  }
}

SensorReadingRow.propTypes = {
  data: PropTypes.object
}
