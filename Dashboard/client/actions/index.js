import * as types from '../constants/actionTypes'

export const addData = (data) => ({
  type: types.ADD_DATA,
  data: data
})
export const activeSensor = (data) => ({
  type: types.ACTIVE_SENSOR,
  data: data
})
