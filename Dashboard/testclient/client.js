const socketio = require('socket.io-client')
const socket = socketio('ws://localhost:3000/websocket', {
  reconnection: true,
  reconnectionDelay: 1000 })

let temp = 3
  let id = Math.random().toString(13).replace('0.', '')

  setInterval(() => {
    if (socket.connected === false) {
      socket.connect()
    } else {
      temp += Math.floor(Math.random() * 3)
      console.log('Socket connected, sending: ' + temp)
      socket.emit('sensorReadings', {
        _id: '5c01821deaed443ee82b751a',
        name: 'Fridge',
        colour: 'blue',
        online: true,
        sensors: [
          {
            type: 'temp',
            data: temp,
            id: '92087b146516598'
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
  //   "name": "Fridge", / 
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
  