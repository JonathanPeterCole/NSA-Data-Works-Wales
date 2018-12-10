const mongo = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID
const MongoNetworkError = require('mongodb').MongoNetworkError

class database {
  static setup (url, dbname) {
    this.url = url
    this.collection = null
    this.mongo = null
    this.db = null
    this.dbname = dbname
  }
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
  static setCollection (collection) {
    this.collection = collection
  }
  static update (key, match, replacement) {
    this.db.collection(this.collection).updateOne({ [key]: match }, { $set: { ...replacement } })
  }
  static insert (data) {
    console.log(data)
    this.db.collection(this.collection).insertOne(data, (err) => {
      console.log(err)
    })
  }
  static insertMany (data) {
    this.db.collection(this.collection).insertMany(data, (err) => {
      console.log(err)
    })
  }
  static async findDocument (key, name) {
    return this.db.collection(this.collection).findOne({ [key]: name })
  }
  static async findRaw (filter) {
    return this.db.collection(this.collection).findOne(filter)
  }
  static async findAll () {
    return this.db.collection(this.collection).find({}).toArray()
  }
  static async lookup (from, local, foreign, asData) {
    console.log(this.collection)
    return this.db.collection(this.collection).aggregate([
      { $lookup:
        {
          from: from,
          localField: local,
          foreignField: foreign,
          as: asData
        }
      }]).toArray()
  }
  static async lookupSingle (from, local, foreign, asData, key, match) {
    console.log(' key ' + key + ' - ' + match)
    return this.db.collection(this.collection).aggregate([
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
  // async test(){
  //   return this.db.collection(this.collection).findOne({ [key]: name }).aggregate([
  //     { $lookup:
  //       {
  //         from: from,
  //         localField: local,
  //         foreignField: foreign,
  //         as: asData
  //       }
  //     }]).toArray()
  // }
}
module.exports = database
