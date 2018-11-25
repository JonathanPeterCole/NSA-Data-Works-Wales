
import { connect } from 'react-redux'
import KnownSensorComponent from '../components/sensor/KnownSensor'
import { activeSensor } from '../actions/index'

const mapDispatchToProps = dispatch => ({
  dispatch: (data) => {
    dispatch(activeSensor(data))
  }
})

export const KnownSensor = connect(() => ({}), mapDispatchToProps)(KnownSensorComponent)
