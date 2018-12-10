class socketApi {
  constructor (db) {
    this.clients = []
    this.sensors = []
    this.arduinos = []
    this.projects = []

    this.data = []
    this.knownSensors = []
    this.knownArduinos = []
    this.unknownSensors = []
    this.db = db
    this.populateKnownSensors()
    setInterval(() => {
      if (this.clients.length !== 0) {
        this.broadcastAll('sensorReadings', this.lastReadings(), this.sensors)
      }
    }, 1500)
    setInterval(() => this.checkDisconnected(), 3000)
  }

  connect (socket) {
    this.clients.push(socket)
    if (this.data.length !== 0) {
      this.broadcastTo(socket, 'sensorReadings', this.lastReadings(), this.sensors)
    }
    this.checkDisconnected()
    // socket.on('setType', (data) => {
    //   socket.type = data.type
    // })
    socket.on('sensorReadings', (data) => {
      this.setSocketAsSensor(data, socket)
      this.saveReadings()
      if (!this.socketExists(socket, this.sensors)) {
        this.sensors.push(socket)
      }
      this.addSensorData(data)
      // this.saveReadings()
    })
    socket.on('updateSettings', (data) => {
      this.saveSensor(data.id, data.name)
      this.updateSensors(data.id, data.name)
    })
    socket.on('disconnect', () => {
      this.removeClient(socket.id)
    })
  }
  addSensorData (data) {
    this.arduinos.forEach(arduino => { // loop through each arduino
      if (arduino._id === data._id) {
        arduino.sensors.forEach(sensor => { // loop through each of its sensors
          data.sensors.forEach(sensorReading => { // loop through each of the sensors sent in the newdata
            if (sensorReading.id === sensor.id) {
              sensor.lastUpdate = +new Date()
              if (sensor.newdata) {
                sensor.newdata.push({ reading: sensorReading.data, time: +new Date() })
              } else {
                sensor.newdata = [{ reading: sensorReading.data, time: +new Date() }]
              }
            }
          })
        })
      }
    })
  }

  /*
  Sets this socket as an arduino, and changes the last updated date since its being called from sensorreadings socket call
  */
  setSocketAsSensor (data, socket) {
    if (!socket.aid) {
      socket.aid = data.arduino
    }
    socket.lastSent = +new Date()
  }

  /*
  Generic function to find and return an index of a given array based off a key val.
  */
  findIndexInArray (key, val, array) {
    for (let k in array) {
      if (String(array[k][key]) === String(val)) {
        return k
      }
    }
    return false
  }

  /*
    Checks if a sensor is currently active
  */
  checkDisconnected () {
    this.arduinos.forEach(arduino => {
      arduino.sensors.forEach(sensor => {
        let curTime = sensor.lastUpdate
        if (new Date() - new Date(curTime) > 5000 && sensor.online === true) {
          // this.saveSingleSensor(sensor)
          sensor.online = false
        } else {
          sensor.online = true
        }
      })
    })
    // this.sensors.forEach((e, idx) => {
    //   if (e.connected === false) {
    //     this.sensors.splice(idx, 1)
    //   }
    // })
  }
  socketExists (socket, array) {
    for (let i in array) {
      if (array[i].id === socket.id) { return true }
    }
    return false
  }
  updateSensors (id, name) {
    for (let s in this.unknownSensors) {
      if (this.unknownSensors[s].id === id) {
        this.unknownSensors[s].name = name
        this.knownSensors.push(this.unknownSensors[s])
        this.unknownSensors.splice(s, 1)
      }
    }
    for (let s in this.knownSensors) {
      if (this.knownSensors[s].id === id) {
        this.knownSensors[s].name = name
      }
    }
  }

  lastReadings () {
    let readings = JSON.stringify(this.arduinos)
    readings = JSON.parse(readings)
    readings.forEach(arduino => {
      arduino.sensors.forEach((sensor, i) => {
        if (sensor.data) {
          if (sensor.newdata) {
            let data = sensor.data.concat(sensor.newdata)
            sensor.data = data.slice(-10, data.length - 1)
          }
        }
      })
    })
    console.log(readings[0])
    return readings
  }

  populateKnownSensors () {
    this.db.setCollection('arduinos')
    this.db.findAll().then((arduinos) => {
      arduinos.forEach(arduino => {
        arduino.sensors.forEach(sensor => {
          console.log(sensor)
          sensor.data = sensor.data.splice(sensor.data.length - 10, 10)
        })
      })
      this.arduinos = arduinos
    })
  }

  saveReadings () {
    let changed = []

    this.arduinos.forEach((arduino, p) => {
      arduino.sensors.forEach((sensor, s) => {
        if (sensor.newdata) {
          if (sensor.newdata.length > 40) {
            let aid = this.findIndexInArray('_id', arduino._id, changed)
            if (aid) {
              changed[aid].sensors.push({ _id: sensor._id, new: sensor.newdata.splice(-10, 10) })
            } else {
              changed.push({ _id: arduino._id, sensors: [{ _id: sensor._id, new: sensor.newdata.splice(-10, 10) }] })
            }
          }
        }
      })
    })
    this.db.setCollection('arduinos')
    changed.forEach(arduino => {
      this.db.findDocument('_id', arduino._id).then(result => {
        arduino.sensors.forEach(sensor => {
          result.sensors.forEach(dbSensor => {
            if (String(dbSensor._id) === String(sensor._id)) {
              if (dbSensor.data) {
                dbSensor.data = sensor.new.concat(dbSensor.data)
                dbSensor.data = dbSensor.data.length >= 500 ? dbSensor.data.splice(0, (500) - (dbSensor.data.length - 500)) : dbSensor.data
                dbSensor.lastUpdate = +new Date()
              } else {
                dbSensor.data = sensor.new
                dbSensor.lastUpdate = +new Date()
              }
            }
          })
        })
        this.db.update('_id', arduino._id, result)
      })
    })
  }
  hasSensor (id) {
    for (let d in this.knownSensors) {
      if (this.knownSensors[d].id === id) {
        return true
      }
    }
    return false
  }
  removeClient (id) {
    for (let client in this.clients) {
      if (this.clients[client].id === id) {
        this.clients.splice(client, 1)
      }
    }
  }
  saveSensor (id, name) {
    this.db.setCollection('sensors')
    if (this.hasSensor(id)) {
      this.db.update('id', id, { name })
    } else {
      this.db.insert({ id, name })
    }
  }
  findSensor (id) {
    this.db.setCollection('sensors')
    this.db.findDocument('id', id, (result) => {
    })
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

module.exports = socketApi
