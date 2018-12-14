
import { connect } from 'react-redux'
import IdentifyPromptComponent from '../components/sensor/IdentifyPrompt'
import { activeSensor } from '../actions/index'

const mapStateToProps = state => ({
  data: state.sensors.active
})
const mapDispatchToProps = dispatch => ({
  dispatch: (data) => {
    dispatch(activeSensor(data))
  }
})
export const IdentifyPrompt = connect(mapStateToProps, mapDispatchToProps)(IdentifyPromptComponent)
