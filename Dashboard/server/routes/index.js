const express = require('express')
const router = express.Router()
const sensors = require("./../controllers/sensors")
let sensorController = new sensors()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

router.get('/api/', (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(sensorController.getSensors())
})
module.exports = router
