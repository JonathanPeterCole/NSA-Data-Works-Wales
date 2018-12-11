const socketio = require('socket.io-client')
const socket = socketio('ws://localhost:3000/websocket', {
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
      name: 'Fridge',
      colour: 'blue',
      sensors: [
        {
          type: 'temp',
          data: temp,
          id: '92087b146516598'
        },
        {
          type: 'moisture',
          data: temp,
          id: '0512951294012'
        }
      ]
    })
    if (temp > 30) {
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
