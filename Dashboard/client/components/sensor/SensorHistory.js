import React from 'react'
import PropTypes from 'prop-types'
import SensorReadingRow from './SensorReadingRow'

export default class SensorHistory extends React.Component {
  constructor (props) {
    super(props)
    console.log(props)
  }
  render () {
    return (
      <table className='sensor-history'>
        <thead>
          <tr>
            <th>Date</th>
            <th>Reading</th>
          </tr>
        </thead>
        <tbody>
          {this.props.data.reverse().map(s => {
            return (<SensorReadingRow key={s.id} data={s} />)
          })}
        </tbody>
      </table>
    )
  }
}

SensorHistory.propTypes = {
  data: PropTypes.object
}
