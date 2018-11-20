
import { connect } from 'react-redux'
import SensorsComponent from '../components/sensor/Sensors'
import { addData } from '../actions/index'

const mapDispatchToProps = dispatch => ({
  dispatch: (data) => {
    dispatch(addData( data))
  }
})

const mapStateToProps = state => ({
  sensors: state.sensors
})

export const Sensors = connect(mapStateToProps  , mapDispatchToProps)(SensorsComponent)