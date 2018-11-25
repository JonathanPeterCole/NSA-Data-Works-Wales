class Sensors {
  constructor (db) {
    this.db = db
  }
  async getSensor (id) {
    this.db.setCollection('sensors')
    let data = await this.db.findDocument('id', id)
    return data
  }
}

module.exports = Sensors
