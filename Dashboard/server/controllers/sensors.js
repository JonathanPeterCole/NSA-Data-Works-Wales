class SensorsController {
  constructor (db) {
    this.db = db
    this.collection = 'arduinos'
  }
  async getSensor (id) {
    return this.db.findDocument('_id', this.db.getObjectID(id), this.collection)
  }
}

module.exports = SensorsController
