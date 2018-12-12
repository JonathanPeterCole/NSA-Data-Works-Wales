const mongo = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID
const MongoNetworkError = require('mongodb').MongoNetworkError

class Database {
  static setup (url, dbname) {
    this.url = url
    this.mongo = null
    this.db = null
    this.dbname = dbname
  }
  // Connect
  static connect () {
    return new Promise((resolve, reject) => {
      mongo.connect(this.url, { useNewUrlParser: true })
        .then((client) => {
          this.mongo = client
          this.db = client.db(this.dbname)
          resolve(this)
        })
        .catch(err => {
          if (err instanceof MongoNetworkError) {
            console.error('Failed to connect to Mongo DB sensor server, please check the DataWorks README to install Mongo.')

            // console.error(err.stack)
            process.exit(1)
          }
        })
    })
  }
  // Update
  static update (key, match, replacement, collection) {
    this.db.collection(collection).updateOne({ [key]: match }, { $set: { ...replacement } })
  }
  static arrayUpdate (key, match, newItem, collection) {
    this.db.collection(collection).updateOne({ [key]: match }, { $push: newItem })
  }
  // Insert
  static insert (data, collection) {
    console.log(data)
    this.db.collection(collection).insertOne(data, (err) => {
      console.log(err)
    })
  }
  static insertPromise (data, collection) {
    return new Promise((resolve, reject) => {
      console.log(data)
      this.db.collection(collection).insertOne(data)
        .then((result) => {
          console.log(result.ops[0])
          resolve(result.ops[0])
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
  static insertMany (data, collection) {
    this.db.collection(collection).insertMany(data, (err) => {
      console.log(err)
    })
  }
  // Find
  static async findDocument (key, name, collection) {
    return this.db.collection(collection).findOne({ [key]: name })
  }
  static async findRaw (filter, collection) {
    return this.db.collection(collection).findOne(filter)
  }
  static async findAll (collection) {
    return this.db.collection(collection).find({}).toArray()
  }
  static async lookup (from, local, foreign, asData, collection) {
    console.log(collection)
    return this.db.collection(collection).aggregate([
      { $lookup:
        {
          from: from,
          localField: local,
          foreignField: foreign,
          as: asData
        }
      }]).toArray()
  }
  static async lookupSingle (from, local, foreign, asData, key, match, collection) {
    console.log(' key ' + key + ' - ' + match)
    return this.db.collection(collection).aggregate([
      { $match: { [key]: match } },
      { $lookup:
        {
          from: from,
          localField: local,
          foreignField: foreign,
          as: asData
        }
      }
    ]).toArray()
  }
  static async raw (cb) {
    return cb(this.db, this.collection)
  }
  static getObjectID (id) {
    try {
      return new ObjectID(id)
    } catch (e) {
      return 'Error: ID Supplied must be a 12 byte string or 24 hex characters'
    }
  }
}
module.exports = Database
