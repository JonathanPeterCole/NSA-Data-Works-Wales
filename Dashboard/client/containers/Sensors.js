
import { connect } from 'react-redux'
import SensorsComponent from '../components/pages/Sensors'
import { addData } from '../actions'

const mapDispatchToProps = dispatch => ({
  dispatch: (data) => {
    dispatch(addData(data))
  }
})

const mapStateToProps = state => ({
  sensors: state.sensors
})

export const Sensors = connect(mapStateToProps, mapDispatchToProps)(SensorsComponent)
