import SerialPort from 'serialport'
import Readline from '@serialport/parser-readline'
import EventEmitter from 'events'

export default class ArduinoConnect extends EventEmitter {
  connect (comName) {
    this.connectDevice(comName)
      .then(() => this.connectLibrary())
      .then(() => {
        // Set the state to connected
        this.emit('connected')
        // Handle new data
        this.lineStream.on('data', (data) => {
          this.handleData(data)
        })
      })
      .catch((error) => {
        this.emit('error', error)
      })
      .finally(() => {
        if (this.serialPort) {
          // Handle disconnects
          this.serialPort.on('close', () => {
            this.emit('disconnected')
          })
        }
      })
  }

  connectDevice (comName) {
    return new Promise((resolve, reject) => {
      // Setup the port
      this.serialPort = new SerialPort(
        comName, { baudRate: 9600 }, (error) => {
          // If the Serial port cannot be opened, throw an error
          if (error) {
            reject(error)
          }
        }
      )
      resolve()
    })
  }

  connectLibrary (serialPort) {
    return new Promise((resolve, reject) => {
      // Prepare a timeout
      let timeout = setTimeout(() => {
        // If the connection times out, close the port and throw an error
        this.serialPort.close()
        reject(new Error('Timeout'))
      }, 15000)
      // Setup parser
      this.lineStream = this.serialPort.pipe(new Readline({ delimiter: '\r\n' }))
      // Wait to recieve data
      this.lineStream.on('data', (data) => {
        try {
          // Parse the data and check if it includes a dataworks object with connect:true
          if (JSON.parse(data).dataworks.connect) {
            // Stop listening for data
            this.lineStream.removeAllListeners('data')
            // Clear the timeout
            clearTimeout(timeout)
            // Resolve and return the serialPort
            resolve()
            // Send an 'okay' message to the arduino
            this.serialPort.write('okay')
          } else {
            // Stop listening for data
            this.lineStream.removeAllListeners('data')
            // Reject with error if the JSON isn't valid
            reject(new Error('Device was not recognised. Make sure the USB library is setup correctly.'))
          }
        } catch (error) {
          console.log('Invalid JSON. Waiting for new data...')
        }
      })
    })
  }

  handleData (data) {
    // Attempt to parse the data
    let parsedData
    try {
      parsedData = JSON.parse(data)
    } catch (error) {
      // Catch parsing errors
      this.emit('error', error)
      return
    }
    // Attempt to get the reading
    if (parsedData.dataworks.sensorReading) {
      this.emit('data', parsedData.dataworks)
    } else {
      this.emit('error', new Error('Invalid data recieved'))
    }
  }
}
