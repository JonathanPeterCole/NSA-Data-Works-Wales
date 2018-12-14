var bcrypt = require('bcryptjs')
var jsonwebtoken = require('jsonwebtoken')
var config = require('../../config/config.json')

class UsersController {
  constructor (db) {
    this.db = db
    this.collection = 'users'
  }
  async createUser (username, password) {
    // Check if a user already exists with this name
    let user = await this.db.findRaw({ 'username': username }, this.collection)
    if (user) {
      return JSON.stringify({
        status: 'Failure',
        message: 'User with this name already exists'
      })
    }

    if (password.length < 5) {
      return JSON.stringify({
        status: 'Failure',
        message: 'Password must be more than 5 characters long'
      })
    }
    if (username.length < 4) {
      return JSON.stringify({
        status: 'Failure',
        message: 'Username must be more than 4 characters long'
      })
    }
    let hash = await bcrypt.hash(password, 10)
    if (hash) {
      this.db.insert({ username, password: hash }, this.collection)
      return JSON.stringify({
        status: 'Success',
        message: 'User created, you can now login!'
      })
    } else {
      return JSON.stringify({
        status: 'Failure',
        message: 'User could not be created.'
      })
    }
  }
  async authenticate (username, password) {
    // Find the user in the database
    let user = await this.db.findRaw({ username }, this.collection)
    // Check if the user exists
    if (!user) {
      return null
    } else {
      // Check if the password matches
      let match = await bcrypt.compare(password, user.password)
      if (match) {
        return user
      } else {
        return null
      }
    }
  }
  async checkUsername (username, password) {
    let user = await this.db.findRaw({ 'username': username }, this.collection)
    let message
    if (!user) {
      message = {
        status: 'Failure',
        message: 'Username and password combination not recognized'
      }
    } else {
      let res = await bcrypt.compare(password, user.password)
      if (res) {
        let token = jsonwebtoken.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          id: user._id
        }, config.jwtCert)
        message = {
          status: 'Success',
          message: 'Username and password valid',
          token
        }
      } else {
        message = {
          status: 'Failure',
          message: 'Username and password combination not recognized'
        }
      }
    }
    return JSON.stringify(message)
  }
  async checkJWT (string) {
    try {
      return await jsonwebtoken.verify(string, config.jwtCert)
    } catch (JsonWebTokenError) {
      return false
    }
  }
  async getUserByJWT (jwt) {
    try {
      return this.db.findDocument('_id', this.db.getObjectID(jwt.id), this.collection)
    } catch (e) {
      return false
    }
  }
  async getProjects (jwt) {
    try {
      let user = await this.db.findDocument('_id', this.db.getObjectID(jwt.id), this.collection)
      return user.projects
    } catch (e) {
      return false
    }
  }
  async getArduinos (id) {
    let user = await this.db.findDocument('_id', id, this.collection)
    return user.projects
  }
  async addArduino (userId, arduinoId) {
    let user = await this.db.findDocument('_id', this.db.getObjectID(userId), this.collection)
    await this.db.arrayUpdate('_id', user._id, { projects: { _id: this.db.getObjectID(arduinoId), notifications: [] } }, this.collection)
  }
}

module.exports = UsersController
