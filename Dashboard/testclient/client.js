const socketio = require('socket.io-client')
const socket = socketio("ws://localhost:3000/websocket", {
    reconnection: true,
    reconnectionDelay: 1000})

let temp = 3;
let id = Math.random().toString(13).replace('0.', '') 
setInterval(() => {
    if(socket.connected == false){
        socket.connect();
    } else {
        temp += Math.floor(Math.random() * 3)
        console.log("Socket connected, sending: " + temp)
        socket.emit("sensorReadings", {data: temp, id})
        if(temp > 30){
            temp = 10
        }
    }
}, 1500)
