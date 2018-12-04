// Require the serialport node module
const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')

// Get the Arduinos
let getArduinos = new Promise((resolve, reject) => {
    SerialPort.list().then((result) => {
        resolve(result)
    })
})

getArduinos.then((result) => {
    if (result.length === 0) {
        console.log('No Arduinos found')
    } else {
        // Setup the port
        let serialPort = new SerialPort(result[0].comName, {
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