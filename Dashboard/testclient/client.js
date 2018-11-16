const socketio = require('socket.io-client')
const socket = socketio("http://localhost:3000/websocket")

let temp = 3;
let id = Math.random().toString(13).replace('0.', '') 
setInterval(() => {
    console.log(id)
    temp += Math.floor(Math.random() * 3)
    socket.emit("sensorReadings", {data: temp, id})
    if(temp > 30){
        temp = 10
    }
}, 1500)
