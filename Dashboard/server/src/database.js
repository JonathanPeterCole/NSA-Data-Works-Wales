const mongo = require('mongodb').MongoClient
const MongoNetworkError = require('mongodb').MongoNetworkError

class database {
  constructor (url, dbname) {
    this.url = url
    this.collection = null
    this.mongo = null
    this.db = null
    this.dbname = dbname
  }
  connect () {
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
  setCollection (collection) {
    this.collection = collection
  }
  update (key, match, replacement) {
    this.db.collection(this.collection).updateOne({ [key]: match }, { $set: { ...replacement } })
  }
  insert (data) {
    console.log(data)
    this.db.collection(this.collection).insertOne(data, (err) => {
      console.log(err)
    })
  }
  insertMany (data) {
    this.db.collection(this.collection).insertMany(data, (err) => {
      console.log(err)
    })
  }
  async findDocument (key, name) {
    return this.db.collection(this.collection).findOne({[key]: name})
  }
  async findAll () {
    return this.db.collection(this.collection).find({}).toArray()
  }
}
module.exports = database
