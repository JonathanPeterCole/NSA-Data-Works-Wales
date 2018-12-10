class Sensors {
  constructor (db) {
    this.db = db
  }
  async getSensor (id) {
    this.db.setCollection('arduinos')
    let data = await this.db.findDocument('_id', this.db.getObjectID(id))
    return data
  }
}

module.exports = Sensors
