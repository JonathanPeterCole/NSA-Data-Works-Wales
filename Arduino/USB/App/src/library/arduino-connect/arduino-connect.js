import SerialPort from 'serialport'
import Readline from '@serialport/parser-readline'
import EventEmitter from 'events'

export default class ArduinoConnect extends EventEmitter {
  connect (comName) {
    this.connectDevice(comName)
      .then(serialPort => this.connectLibrary(serialPort))
      .then((serialPort) => {
        // Store the serialPort
        this.serialPort = serialPort
        // Set the state to connected
        this.emit('connected')
        // Setup parser
        let lineStream = serialPort.pipe(new Readline({ delimiter: '\r\n' }))
        // Handle new data
        lineStream.on('data', (data) => {
          this.handleData(data)
        })
        // Handle disconnects
        serialPort.on('close', () => {
          this.emit('disconnected')
        })
      })
      .catch((error) => {
        this.emit('error', error)
      })
  }

  connectDevice (comName) {
    return new Promise((resolve, reject) => {
      // Setup the port
      let serialPort = new SerialPort(
        comName, { baudRate: 9600 }, (error) => {
          // If the Serial port cannot be opened, throw an error
          if (error) {
            reject(error)
          }
        }
      )
      resolve(serialPort)
    })
  }

  connectLibrary (serialPort) {
    return new Promise((resolve, reject) => {
      // Prepare a timeout
      let timeout = setTimeout(() => {
        // If the connection times out, close the port and throw an error
        serialPort.close()
        reject(new Error('Timeout'))
      }, 15000)
      // Setup parser
      let lineStream = serialPort.pipe(new Readline({ delimiter: '\r\n' }))
      // Wait to recieve data
      lineStream.on('data', (data) => {
        try {
          // Parse the data and check if it includes a dataworks object with connect:true
          if (JSON.parse(data).dataworks.connect) {
            // Stop listening for data
            lineStream.removeAllListeners('data')
            // Clear the timeout
            clearTimeout(timeout)
            // Resolve and return the serialPort
            resolve(serialPort)
            // Send an 'okay' message to the arduino
            serialPort.write('okay')
          } else {
            // Stop listening for data
            lineStream.removeAllListeners('data')
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
      this.emit('data', parsedData.dataworks.sensorReading)
    }
  }
}
