const express = require('express')
const router = express.Router()
const Sensors = require('./../controllers/sensors')
const Users = require('./../controllers/users')

const Database = require('../src/database')

let sensorController = new Sensors(Database)
let userController = new Users(Database)

// ^ MOVE THIS TO MAIN FILE, PREFERABLY USE ONE DB CONNECT OBJECT
router.post('/login', (req, res, next) => {
  res.setHeader('Content-Type', 'application/json')
  userController.checkUsername(req.body.username, req.body.password).then(r => {
    res.send(r)
  })
})
router.post('/register', (req, res, next) => {
  res.setHeader('Content-Type', 'application/json')
  userController.createUser(req.body.username, req.body.password).then(r => {
    res.send(r)
  })
})

router.use(async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ status: 'Failure', message: 'No JWT token supplied, please login!' })
  } else {
    let verify = await userController.checkJWT(req.headers.authorization)
    if (verify) {
      next()
    } else {
      return res.status(403).json({ status: 'Failure', message: 'Invalid JWT token supplied, please try again' })
    }
  }
})

router.get('/history/:id', (req, res, next) => {
  res.setHeader('Content-Type', 'application/json')
  sensorController.getSensor(req.params.id).then(r => {
    res.send(r)
  })
})

module.exports = router

// ALLOW RENDERING AFTER DB CONNETS
