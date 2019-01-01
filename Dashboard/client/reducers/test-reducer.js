import * as ActionTypes from '../constants/actionTypes'

const test = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.SENSOR_DATA:
      return ({ arduinos: action.data })

    default:
      return state
  }
}
export default test
