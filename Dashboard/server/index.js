#!/usr/bin/env node

const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const path = require('path')
const cookieParser = require('cookie-parser')
const Database = require('./src/database')
const Email = require('./src/email')

// Routers
const indexRouter = require('./routes/index')
const apiRouter = require('./routes/api')

// Sockets
const DashboardSocketAPI = require('./src/dashboard-socket-api')
const ArduinoSocketAPI = require('./src/arduino-socket-api')

// Prepare variables to hold the socket API's
let dashboardSocketAPI
let arduinoSocketAPI

// Setup the emails class
Email.setup()

// Set the database config
Database.setup('mongodb://localhost:27017', 'iot-app')

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
app.use('/api', apiRouter)
app.use('/', indexRouter)

Database.connect().then(() => {
  dashboardSocketAPI = new DashboardSocketAPI(Database)
  arduinoSocketAPI = new ArduinoSocketAPI(Database)
  io.of('/websocket/dashboard').on('connection', dashboardSocketAPI.connect.bind(dashboardSocketAPI))
  io.of('/websocket/arduino').on('connection', arduinoSocketAPI.connect.bind(arduinoSocketAPI))
  server.listen(3000)
})

// Listen
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
