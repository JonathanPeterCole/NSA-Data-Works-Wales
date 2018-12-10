import * as types from '../constants/actionTypes'

export const sensorData = (data) => ({
  type: types.SENSOR_DATA,
  data: data
})

export const arduinoData = (data) => ({
  type: types.ARDUINO_DATA,
  data: data
})
