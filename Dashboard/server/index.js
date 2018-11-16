#!/usr/bin/env node

const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const path = require('path')
const cookieParser = require('cookie-parser')
const mongo = require('mongodb').MongoClient;

// Routers
const indexRouter = require('./routes/index')
const apiRouter = require('./routes/api')

// Sockets
const SocketApi = require('./sockets/socket-api')

// Connect to database and create socket object
let socketApi = new SocketApi()

// let db = mongo.connect("mongodb://localhost:27017", {useNewUrlParser : true}).then((err, client) => {
//   socketApi = new SocketApi(client)
// }); // catch error

// Create socket object


// Prepare express
const app = express()
const server = http.Server(app)
const io = socketio(server)

// View engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// Processors
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../public')))

// Routes
app.use('/', indexRouter)
app.use('/api', apiRouter)

// Socket IO
io.of('/websocket').on('connection', socketApi.connect.bind(socketApi)) // change bind? weird javascript behaviour i cant explain, must be binding the sockets-io object as is overriding variables

// Listen
server.listen(3000 )
server.on('listening', () => console.log('Example app listening on port 3000'))
server.on('error', (error) => {
  // Check if the error was a listening error
  if (error.syscall !== 'listen') {
    throw error
  }
  // Handle common error codes
  switch (error.code) {
    case 'EACCES':
      console.error('Port 3000 requires elevated privileges')
      process.exit(1)
    case 'EADDRINUSE':
      console.error('Port 3000 is already in use')
      process.exit(1)
    default:
      throw error
  }
})
