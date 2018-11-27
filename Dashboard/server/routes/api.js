const express = require('express')
const router = express.Router()
const Sensors = require('./../controllers/sensors')

const Database = require('../src/database')
const database = new Database('mongodb://localhost:27017', 'iot-app')
let sensorController
database.connect().then((client) => {
  sensorController = new Sensors(client)
})

// ^ MOVE THIS TO MAIN FILE, PREFERABLY USE ONE DB CONNECT OBJECT

// router.use((req, res, next) => {
//   if(req.xhr){
//     next()
//   } else {
//     res.status(400).end('400 Bad Request')
//   }
// })

router.get('/history/:id', (req, res, next) => {
  res.setHeader('Content-Type', 'application/json')
  sensorController.getSensor(req.params.id).then(r => {
    res.send(r)
  })
})
module.exports = router

// ALLOW RENDERING AFTER DB CONNETS
