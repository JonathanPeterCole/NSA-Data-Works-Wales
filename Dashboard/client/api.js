import openSocket from 'socket.io-client'
import { sensorData } from './actions'

export default class API {
  static setSocket (socketAddress = 'http://localhost:3000/websocket/dashboard') {
    this.socket = openSocket(socketAddress)

    this.socket.on('sensorReadings', data => {
      this.dispatch(sensorData(data))
    })
  }

  static setDispatch (dispatch) {
    this.dispatch = dispatch
  }
}
