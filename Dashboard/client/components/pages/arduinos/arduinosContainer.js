import { connect } from 'react-redux'
import arduinosComponent from './arduinosComponent'

const mapStateToProps = state => ({
  sensors: state.sensors
})

export const arduinos = connect(mapStateToProps, mapDispatchToProps)(arduinosComponent)
