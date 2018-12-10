var bcrypt = require('bcryptjs')
var jsonwebtoken = require('jsonwebtoken')

class Users {
  constructor (db) {
    this.db = db
  }
  async createUser (username, password) {
    this.db.setCollection('users')
    let hash = await bcrypt.hash(password, 10)
    if (hash) {
      this.db.insert({ username, password: hash })
      return JSON.stringify({
        status: 'Success',
        message: 'User created.'
      })
    } else {
      return JSON.stringify({
        status: 'Failure',
        message: 'User could not be created.'
      })
    }
  }
  async checkUsername (username, password) {
    this.db.setCollection('users')
    let user = await this.db.findRaw({ 'username': username })
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
        }, 'kekkles') // make a cert?
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
      return await jsonwebtoken.verify(string, 'kekkles')
    } catch (JsonWebTokenError) {
      return false
    }
  }
  async getProjects (jwt) {
    try {
      this.db.setCollection('users')
      let user = await this.db.findDocument('_id', this.db.getObjectID(jwt.id))
      return user.projects
    } catch (e) {
      return false
    }
  }
}

module.exports = Users
