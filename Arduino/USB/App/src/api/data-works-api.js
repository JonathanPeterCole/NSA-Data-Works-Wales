import io from 'socket.io-client'
import EventEmitter from 'events'

import ServerConfig from '../../config/server.json'

export default class DataWorksAPI extends EventEmitter {
  constructor () {
    super()
    this.online = false
    // Prepare the socket
    this.socket = io(ServerConfig.location)
    // Setup event listeners
    this.socket.on('connect', () => {
      this.online = true
      this.emit('connected')
    })
    this.socket.on('reconnect', () => {
      this.online = true
      this.emit('connected')
    })
    this.socket.on('disconnect', () => {
      this.online = false
      this.emit('disconnected')
    })
  }

  sendReading (data) {
    // Avoid sending a surge of readings on reconnect by only emmitting readings when online
    if (this.online) {
      console.log('Sending data:')
      console.log(data)
      this.socket.emit('sensorReadings', data)
    } else {
      console.log('Currently Offline, readings not sent.')
    }
  }
}
