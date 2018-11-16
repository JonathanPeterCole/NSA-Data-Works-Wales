const express = require('express')
const router = express.Router()
const sensors = require("./../controllers/sensors")
let sensorController = new sensors()


router.get('/', (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(sensorController.getSensors())
})
module.exports = router
