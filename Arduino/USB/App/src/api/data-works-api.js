import io from 'socket.io-client'
import EventEmitter from 'events'

import ServerConfig from '../../config/server.json'

export default class DataWorksAPI extends EventEmitter {
  constructor () {
    super()
    // Prepare the socket
    this.socket = io(ServerConfig.location)
    // Setup event listeners
    this.socket.on('connect', () => {
      this.emit('connected')
    })
    this.socket.on('reconnect', () => {
      this.emit('connected')
    })
    this.socket.on('disconnect', () => {
      this.emit('disconnected')
    })
  }
}
