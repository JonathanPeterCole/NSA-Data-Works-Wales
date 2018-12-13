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
    // On sensorReadings
    socket.on('sensorReadings', async (data) => {
      // Get the user
      console.log('reading')
      let user = await usersController.authenticate(data.auth.username, data.auth.password)
      if (user) {
        // Get the Arduino
        console.log('ok')
        let arduino = await this.getArduino(user, data.udid)
        let sensor = await this.getSensor(arduino, data.sensorReading.sensorID, data.sensorReading.type)
        sensor.readings.push({ reading: data.sensorReading.reading, time: new Date().getTime() })
        arduinosController.updateArduino(arduino)
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

  async getSensor (arduino, sensorID, sensorType) {
    // Check if there's a sensor with a matching ID and sensor type
    let existingSensorIndex = arduino.sensors.findIndex((sensor) => {
      return sensor.id === sensorID && sensor.type === sensorType
    })
    if (existingSensorIndex >= 0) {
      // If the arduino has a matching sensor, return it
      return arduino.sensors[existingSensorIndex]
    } else {
      // If the arduino has no matching sensors, create one and return it
      arduino.sensors.push({ id: sensorID, type: sensorType, readings: [] })
      return arduino.sensors[arduino.sensors.length - 1]
    }
  }
}

module.exports = ArduinoSocketAPI
