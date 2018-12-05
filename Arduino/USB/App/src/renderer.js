// React
import React from 'react'
import { render } from 'react-dom'

// Serial Port
import SerialPort from 'serialport'
import Readline from '@serialport/parser-readline'

// Components
import App from './components/app'

render(
  <App />,
  document.getElementById('root')
)

// Get the Arduinos
let findArduinos = new Promise((resolve, reject) => {
  SerialPort.list().then((result) => {
    if (result.length > 0) {
      console.log('Working')
      resolve(result)
    } else {
      reject(new Error('No Arduino\'s found'))
    }
  })
})

findArduinos.then((result) => {
  if (result.length === 0) {
    console.log('No Arduinos found')
  } else {
    // Setup the port
    let serialPort = new SerialPort(result[1].comName, {
      baudRate: 9600
    })
    // Setup parser
    let lineStream = serialPort.pipe(new Readline({ delimiter: '\r\n' }))
    // On new line
    lineStream.on('data', console.log)
    // On disconnect
    serialPort.on('close', () => {
      console.log('Disconnected')
    })
  }
})
