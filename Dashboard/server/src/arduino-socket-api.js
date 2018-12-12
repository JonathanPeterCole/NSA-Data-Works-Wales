const Users = require('../controllers/users')
const Arduinos = require('../controllers/arduinos')
const Database = require('./database')

let usersController = new Users(Database)
let arduinosController = new Arduinos(Database)

class ArduinoSocketAPI {
  constructor (db) {
    this.db = db
  }

  connect (socket) {
    socket.on('sensorReadings', async (data) => {
      console.log('on SensorReadings')
      // Get the user
      let user = await usersController.authenticate(data.auth.username, data.auth.password)
      if (user) {
        // Get the Arduino
        let arduino = await this.getArduino(user, data.udid)
        if (arduino) {
          console.log('Arduino found')
        }
      }
    })
  }

  async getArduino (user, udid) {
    let usersArduinos = await usersController.getArduinos(user._id)
    // If the user has arduinos, check if there's one with a matching UDID
    if (usersArduinos) {
      for (let arduinoID of usersArduinos) {
        let arduino = await arduinosController.getArduino(arduinoID)
        // If the Arduino has a matching UDID, return it
        if (arduino.udid === udid) {
          return arduino
        }
      }
    }
    // If the user has no matching Arduinos, create one and add it to the user
    let newArduino = await arduinosController.createArduino(udid)
    usersController.addArduino(user._id, newArduino._id)
    return newArduino
  }

  // constructor (db) {
  //   this.clients = []
  //   this.sensors = []
  //   this.arduinos = []
  //   this.projects = []
  //   this.users = []

  //   this.data = []
  //   this.knownSensors = []
  //   this.knownArduinos = []
  //   this.unknownSensors = []
  //   this.db = db
  //   this.populateKnownSensors()
  //   this.checkDisconnected()

  //   setInterval(this.sendData.bind(this), 1500)
  //   setInterval(() => this.checkDisconnected(), 3000)
  // }
  // connect (socket) {
  //   this.clients.push(socket)

  //   this.checkDisconnected()
  //   // socket.on('setType', (data) => {
  //   //   socket.type = data.type
  //   // })
  //   // socket.on('setUser', async (data) => {
  //   //   let json = JSON.parse(data)
  //   //   let jwt = await userController.checkJWT(json.jwt)
  //   //   if (jwt) {
  //   //     let projects = await userController.getProjects(jwt)
  //   //     let userprojects = this.arduinos.filter(arduino => {
  //   //       for (let i in projects) {
  //   //         if (String(projects[i]) === String(arduino._id)) {
  //   //           return arduino
  //   //         }
  //   //       }
  //   //     })
  //   //     this.users.push({ socket, userprojects })
  //   //     socket.emit('sensorReadings', userprojects)
  //   //   }
  //   // })
  //   socket.on('sensorReadings', (data) => {
  //     this.setSocketAsSensor(data, socket)
  //     this.saveReadings()
  //     if (!this.socketExists(socket, this.sensors)) {
  //       this.sensors.push(socket)
  //     }
  //     this.addSensorData(data)
  //     // this.saveReadings()
  //   })
  //   socket.on('updateSettings', (data) => {
  //     this.saveSensor(data.id, data.name)
  //     this.updateSensors(data.id, data.name)
  //   })
  //   socket.on('disconnect', () => {
  //     this.removeClient(socket.id)
  //   })
  // }
  // addSensorData (data) {
  //   this.arduinos.forEach(arduino => { // loop through each arduino
  //     if (arduino._id === data._id) {
  //       arduino.sensors.forEach(sensor => { // loop through each of its sensors
  //         data.sensors.forEach(sensorReading => { // loop through each of the sensors sent in the newdata
  //           if (sensorReading.id === sensor.id) {
  //             sensor.lastUpdate = +new Date()
  //             arduino.lastUpdate = +new Date()
  //             sensor.online = true
  //             arduino.online = true
  //             if (sensor.newdata) {
  //               sensor.newdata.push({ reading: sensorReading.data, time: +new Date() })
  //             } else {
  //               sensor.newdata = [{ reading: sensorReading.data, time: +new Date() }]
  //             }
  //           }
  //         })
  //       })
  //     }
  //   })
  // }

  // /*
  // Sets this socket as an arduino, and changes the last updated date since its being called from sensorreadings socket call
  // */
  // setSocketAsSensor (data, socket) {
  //   if (!socket.aid) {
  //     socket.aid = data.arduino
  //   }
  //   socket.lastSent = +new Date()
  // }

  // /*
  // Generic function to find and return an index of a given array based off a key val.
  // */
  // findIndexInArray (key, val, array) {
  //   for (let k in array) {
  //     if (String(array[k][key]) === String(val)) {
  //       return k
  //     }
  //   }
  //   return false
  // }

  // /*
  //   Checks if a sensor is currently active
  // */
  // checkDisconnected () {
  //   this.arduinos.forEach(arduino => {
  //     arduino.sensors.forEach(sensor => {
  //       let curTime = sensor.lastUpdate
  //       if (new Date() - new Date(curTime) > 5000 && sensor.online !== false) {
  //         this.saveSingleSensor(sensor, arduino._id)
  //         sensor.online = false
  //         arduino.online = false
  //       }
  //     })
  //   })
  //   this.sensors.forEach((e, idx) => {
  //     if (e.connected === false) {
  //       this.sensors.splice(idx, 1)
  //     }
  //   })
  // }
  // socketExists (socket, array) {
  //   for (let i in array) {
  //     if (array[i].id === socket.id) { return true }
  //   }
  //   return false
  // }

  // saveSingleSensor (sensor, arduinoid) {
  //   if (!sensor.newdata) {
  //     return false
  //   }

  //   this.db.setCollection('arduinos')
  //   this.db.findDocument('_id', arduinoid).then(arduino => {
  //     arduino.sensors.forEach(dbsensor => {
  //       if (String(dbsensor._id) === String(sensor._id)) {
  //         dbsensor.data = dbsensor.data.concat(sensor.newdata)
  //         dbsensor.lastUpdate = +new Date()
  //         arduino.lastUpdate = +new Date()
  //         dbsensor.data = dbsensor.data.length >= 500 ? dbsensor.data.splice(0, (500) - (dbsensor.data.length - 500)) : dbsensor.data
  //       }
  //     })
  //     this.db.update('_id', arduinoid, arduino)
  //   })
  // }

  // saveReadings () {
  //   let changed = []
  //   this.arduinos.forEach((arduino, p) => {
  //     arduino.sensors.forEach((sensor, s) => {
  //       if (sensor.newdata) {
  //         if (sensor.newdata.length > 40) {
  //           let aid = this.findIndexInArray('_id', arduino._id, changed)
  //           if (aid) {
  //             changed[aid].sensors.push({ _id: sensor._id, new: sensor.newdata.splice(-10, 10) })
  //           } else {
  //             changed.push({ _id: arduino._id, sensors: [{ _id: sensor._id, new: sensor.newdata.splice(-10, 10) }] })
  //           }
  //         }
  //       }
  //     })
  //   })
  //   this.db.setCollection('arduinos')
  //   changed.forEach(arduino => {
  //     this.db.findDocument('_id', arduino._id).then(result => {
  //       arduino.sensors.forEach(sensor => {
  //         result.sensors.forEach(dbSensor => {
  //           if (String(dbSensor._id) === String(sensor._id)) {
  //             if (dbSensor.data) {
  //               dbSensor.data = sensor.new.concat(dbSensor.data)
  //               dbSensor.data = dbSensor.data.length >= 500 ? dbSensor.data.splice(0, (500) - (dbSensor.data.length - 500)) : dbSensor.data
  //               dbSensor.lastUpdate = +new Date()
  //             } else {
  //               dbSensor.data = sensor.new
  //               dbSensor.lastUpdate = +new Date()
  //             }
  //           }
  //         })
  //       })
  //       this.db.update('_id', arduino._id, result)
  //     })
  //   })
  // }
  // hasSensor (id) {
  //   for (let d in this.knownSensors) {
  //     if (this.knownSensors[d].id === id) {
  //       return true
  //     }
  //   }
  //   return false
  // }
  // removeClient (id) {
  //   for (let client in this.clients) {
  //     if (this.clients[client].id === id) {
  //       this.clients.splice(client, 1)
  //     }
  //   }
  // }
  // saveSensor (id, name) {
  //   this.db.setCollection('sensors')
  //   if (this.hasSensor(id)) {
  //     this.db.update('id', id, { name })
  //   } else {
  //     this.db.insert({ id, name })
  //   }
  // }
  // findSensor (id) {
  //   this.db.setCollection('sensors')
  //   this.db.findDocument('id', id, (result) => {
  //   })
  // }
  // broadcastAll (message, data, exceptions = []) {
  //   this.clients.filter(socket => !exceptions.includes(socket)).forEach(socket => {
  //     socket.emit(message, data)
  //   })
  // }
  // broadcastTo (socket, message, data) {
  //   this.clients.filter(s => s === socket).forEach(socket => {
  //     socket.emit(message, data)
  //   })
  // }
}

module.exports = ArduinoSocketAPI
