
import { connect } from 'react-redux'
import UnknownSensorComponent from '../components/sensor/UnknownSensor'
import { activeSensor } from '../actions/index'

const mapDispatchToProps = dispatch => ({
  dispatch: (data) => {
    dispatch(activeSensor(data))
  }
})


export const UnknownSensor = connect( () => ({})  ,mapDispatchToProps)(UnknownSensorComponent)