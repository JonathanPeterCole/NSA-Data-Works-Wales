const UsersController = require('../controllers/users')
const ArduinosController = require('../controllers/arduinos')
const Database = require('./database')

let usersController = new UsersController(Database)
let arduinosController = new ArduinosController(Database)

class DashboardSocketAPI {
  constructor (db) {
    this.clients = []
    this.users = []
    this.db = db
    setInterval(this.sendData.bind(this), 1500)
  }
  sendData () {
    // Send data on an interval
    if (this.users.length !== 0) {
      this.users.forEach(user => {
        this.sendLastReadings(user)
      })
    }
  }
  newInterval () {
    return setInterval(this.retrieve_rate.bind(this), this.INTERVAL)
  }
  connect (socket) {
    // Add the socket to the clients list
    this.clients.push(socket)
    // Set user
    socket.on('setUser', async (data) => {
      let json = JSON.parse(data)
      // Get the JWT token
      let jwt = await usersController.checkJWT(json.jwt)
      if (jwt) {
        // Get the user
        let user = await usersController.getUserByJWT(jwt)
        // Add the user to the users array
        this.users.push({ socket, user })
        // Get the Arduinos for the user
        let arduinos = await arduinosController.getProjectArduinos(user.projects)
        // Emit the arduinos
        socket.emit('sensorReadings', arduinos)
      }
    })
    // Update settings
    socket.on('updateSettings', (data) => {
      this.saveSensor(data.id, data.name)
      this.updateSensors(data.id, data.name)
    })
    // Remove client on disconnect
    socket.on('disconnect', () => {
      this.removeClient(socket.id)
    })
  }
  findIndexInArray (key, val, array) {
    for (let k in array) {
      if (String(array[k][key]) === String(val)) {
        return k
      }
    }
    return false
  }
  sendLastReadings (user) {
    // Get the Arduinos for the user
    arduinosController.getProjectArduinos(user.user.projects).then((arduinos) => {
      arduinos.forEach(arduino => {
        arduino.sensors.forEach((sensor, i) => {
          if (sensor.data) {
            if (sensor.newdata) {
              let data = sensor.data.concat(sensor.newdata)
              sensor.data = data.slice(-10, data.length - 1)
              // sensor.data = data.slice(-10, data.length-1)
            }
          }
        })
      })
      // Emit the Arduinos
      user.socket.emit('sensorReadings', arduinos)
    })
  }
  removeClient (id) {
    for (let client in this.clients) {
      if (this.clients[client].id === id) {
        this.clients.splice(client, 1)
      }
    }
  }
  broadcastAll (message, data, exceptions = []) {
    this.clients.filter(socket => !exceptions.includes(socket)).forEach(socket => {
      socket.emit(message, data)
    })
  }
  broadcastTo (socket, message, data) {
    this.clients.filter(s => s === socket).forEach(socket => {
      socket.emit(message, data)
    })
  }
}

module.exports = DashboardSocketAPI
