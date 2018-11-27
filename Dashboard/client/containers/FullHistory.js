
import { connect } from 'react-redux'
import FullHistoryComponent from '../components/pages/FullHistory'
import { addData } from '../actions'

const mapDispatchToProps = dispatch => ({
  dispatch: (data) => {
    dispatch(addData(data))
  }
})

const mapStateToProps = state => ({
  sensors: state.sensors
})

export const FullHistory = connect(mapStateToProps, mapDispatchToProps)(FullHistoryComponent)
