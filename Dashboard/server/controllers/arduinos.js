class ArduinosController {
  constructor (db) {
    this.db = db
    this.collection = 'arduinos'
  }
  async createArduino (udid) {
    return this.db.insertPromise({
      name: 'Unnamed Arduino', udid, colour: 'blue', sensors: []
    }, this.collection)
  }
  async getArduino (id) {
    return this.db.findDocument('_id', this.db.getObjectID(id), this.collection)
  }
  async getArduinoByUDID (udid) {
    return this.db.findDocument('udid', this.db.getObjectID(udid), this.collection)
  }
  async updateArduino (arduino) {
    return this.db.update('_id', arduino._id, arduino, 'arduinos')
  }
}

module.exports = ArduinosController
