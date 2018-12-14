const socketio = require('socket.io-client')
const socket = socketio('ws://localhost:3000/websocket/dashboard', {
  reconnection: true,
  reconnectionDelay: 1000 })

let temp = 3

setInterval(() => {
  if (socket.connected === false) {
    socket.connect()
  } else {
    temp += Math.floor(Math.random() * 3)
    socket.emit('sensorReadings', {
      _id: '5c01821deaed443ee82b751a',
      udid: '30123091209312093',
      sensorReading: {
        type: 'temperature',
        sensorID: '92087b146516598',
        reading: temp
      }
    })
    if (temp > 34) {
      temp = 10
    }
  }
}, 1500)

// { INITIAL PAYLOAD - ONLY NEEDS TO BE SENT IF NO OTHER PAYLOAD HAS EVER BEEN SENT BEFORE
//   "id": 0, /
//   "namew": "Fridge", /
//   "colour": "blue",
//   "online": false,
//   "lastConnection": 1543363200000, /
//   "sensors": [
//     {
//       "id": 0,
//       "type": "temperature",
//       "reading": 4
//     },
//     {
//       "id": 1,
//       "type": "light",
//       "reading": 100
//     }
//   ]
// },
