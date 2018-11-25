
import { connect } from 'react-redux'
import SensorPopupComponent from '../components/sensor/SensorPopup'
import { activeSensor } from '../actions/index'

const mapStateToProps = state => {
  let data = {}
  let sensors = state.sensors.unknown.concat(state.sensors.known)
  for (let sensor in sensors) {
    if (sensors[sensor].id === state.sensors.active.id) {
      data.data = sensors[sensor]
    }
  }
  return {
    data
  }
}
const mapDispatchToProps = dispatch => ({
  dispatch: (data) => {
    dispatch(activeSensor(data))
  }
})
export const SensorPopup = connect(mapStateToProps, mapDispatchToProps)(SensorPopupComponent)
