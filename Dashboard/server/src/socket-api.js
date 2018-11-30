class socketApi {
  constructor (db) {
    this.clients = []
    this.data = []
    this.sensors = []
    this.knownSensors = []
    this.unknownSensors = []
    this.db = db
    this.populateKnownSensors()
    setInterval(() => {
      if (this.clients.length !== 0) {
        this.broadcastAll('sensorReadings', this.lastReadings(), this.sensors)
      }
    }, 1500)
    setInterval(() => this.checkDisconnected(), 1000)
  }
  connect (socket) {
    this.clients.push(socket)
    if (this.data.length !== 0) {
      this.broadcastTo(socket, 'sensorReadings', this.lastReadings(), this.sensors)
    }
    socket.on('setType', (data) => {
      socket.type = data.type
    })
    socket.on('sensorReadings', (data) => {
      socket.lastSent = new Date()
      socket.id = data.id 
      if (!this.socketExists(socket, this.sensors)){
        this.sensors.push(socket);
      }
      this.addSensorData(data, socket.type)
      this.saveReadings()
    })
    socket.on('updateSettings', (data) => {
      this.saveSensor(data.id, data.name)
      this.updateSensors(data.id, data.name)
      this.broadcastAll('sensorReadings', this.lastReadings(), this.sensors)
    })
    socket.on('disconnect', () => {
      this.removeClient(socket.id)
    })
  }
  checkDisconnected(){
    this.knownSensors.forEach(sensor => {
        if(!sensor.active){
          return false
        }
        let curTime = sensor.lastUpdate
        if (new Date() - new Date(curTime) > 5000 && sensor.active == true){
          this.saveSingleSensor(sensor)
          sensor.active = false
        }
    });
    for (let i in this.unknownSensors){
      let curTime = this.unknownSensors[i].lastUpdate;
      if (new Date() - new Date(curTime) > 5000){
        this.unknownSensors.splice(i, 1)
      }
    }
    this.sensors.forEach((e, idx) => {
      if (e.connected === false) {
        this.sensors.splice(idx, 1)
      }
    })
  }
  socketExists (socket, array) {
    for (let i in array) {
      if (array[i].id === socket.id) { return true }
    }
    return false;
  }
  updateSensors (id, name) {
    for (let s in this.unknownSensors) {
      if (this.unknownSensors[s]. id === id) {
        this.unknownSensors[s].name = name
        this.knownSensors.push(this.unknownSensors[s])
        this.unknownSensors.splice(s, 1)
      }
    }
    for (let s in this.knownSensors) {
      if (this.knownSensors[s].id === id) {
        this.knownSensors[s].name = name
      }
    }
  }
  lastReadings () {
    let readings = { known: [], unknown: [] }
    for (let reading in this.knownSensors) {
      let currentSensor = this.knownSensors[reading];
      if(currentSensor.data){
        let last = currentSensor.data.length <= 10
          ? currentSensor.data.slice(0, currentSensor.data.length - 1)
          : currentSensor.data.slice(currentSensor.data.length - 11, currentSensor.data.length - 1)
        readings.known.push({ ...currentSensor, data: last })
      } else {
        readings.known.push({ ...currentSensor, data: []})
      }
    }
    for (let reading in this.unknownSensors) {
      let currentSensor = this.unknownSensors[reading];
      if(currentSensor.data){
        let last = currentSensor.data.length <= 10
          ? currentSensor.data.slice(0, currentSensor.data.length - 1)
          : currentSensor.data.slice(currentSensor.data.length - 11, currentSensor.data.length - 1)
        readings.unknown.push({ ...currentSensor, data: last })
      } else {
        readings.unknown.push({ ...currentSensor, data: []})
      }
    }
    return readings
  }
  populateKnownSensors () {
    this.db.setCollection('sensors')
    this.db.findAll().then((data) => {
      data.forEach(arr => {
        if (arr.data){
          if (arr.data.length >= 10){
            arr.data = arr.data.splice(-10, 10)
          }
        } else {
          arr.data = []
        }
      })
      this.knownSensors = data
    })
  }
  saveSingleSensor(sensor){
    if(!sensor.data){
      return false;
    }
    this.db.findDocument('id', sensor.id).then((data) => {
      let saveData = sensor.data;
      data.data = data.data ? data.data.concat(saveData) : saveData;
      data.data = data.data.length  >= 500 ? data.data.splice(0, (500)-(data.data.length - 500)): data.data;
      data.lastUpdate = saveData[saveData.length-1].time;
      this.db.update("id", sensor.id, data)
    });
  }
  saveReadings (){
    this.knownSensors.filter(e => e.data !== undefined).forEach(sensor => {
      if(sensor.data.length >= 40){
        let saveData = sensor.data.splice(0, 10);
        this.db.findDocument("id", sensor.id).then((data) => {
          data.data = data.data ? data.data.concat(saveData) : saveData;
          data.data.length >= 500 ? data.data.splice(0, 10): null;
          data.lastUpdate = saveData[saveData.length-1].time;
          this.db.update("id", sensor.id, data)
        })
      }    
    })
  }
  addSensorData (data, type) {
    switch (type) {
      case 'temp':
        data.data = parseInt(data.data)
        break
    }
    let added = false
    let date = new Date().toUTCString()
    let id = Math.random().toString(13).replace('0.', '')
    for (let d in this.unknownSensors) {
      if (this.unknownSensors[d].id === data.id) {
        this.unknownSensors[d].data.push({ reading: data.data, time: date, id: id })
        this.unknownSensors[d].lastUpdate = date
        this.unknownSensors[d].active = data.active
        added = true
      }
    }
    for (let d in this.knownSensors) {
      if (this.knownSensors[d].id === data.id) {
        this.knownSensors[d].data.push({ reading: data.data, time: date, id: id, type })
        this.knownSensors[d].lastUpdate = date
        this.knownSensors[d].active = data.active
        added = true
      }
    }
    if(added == false){
      this.db.setCollection("sensors");
      this.db.findDocument("id", data.id).then(result => {
        if(result === null && !this.socketExists(data, this.unknownSensors)){
          console.log('what')
          this.unknownSensors.push({id: data.id, type, data: [{reading: data.data, time: data,id: id}], active: data.active});
        } else if(result !== null  && !this.socketExists(result, this.knownSensors)) { 
          console.log('hey')
          this.knownSensors.push({id: data.id,type, data: [{reading: data.data, time: date, id:id}], name:result.name, active: data.active})
        }
      })
    }
  }
  hasSensor (id) {
    for (let d in this.knownSensors) {
      if (this.knownSensors[d].id === id) {
        return true
      }
    }
    return false
  }
  removeClient (id) {
    for (let client in this.clients) {
      if (this.clients[client].id === id) {
        this.clients.splice(client, 1)
      }
    }
  }
  saveSensor (id, name) {
    this.db.setCollection('sensors')
    if (this.hasSensor(id)) {
      this.db.update('id', id, { name })
    } else {
      this.db.insert({ id, name })
    }
  }
  findSensor (id) {
    this.db.setCollection('sensors')
    this.db.findDocument('id', id, (result) => {
    })
  }
  broadcastAll (message, data, exceptions = []) {
    this.clients.filter(socket => !exceptions.includes(socket)).forEach(socket => {
      socket.emit(message, data)
    })
  }
  broadcastTo (socket, message, data) {
    this.clients.filter(s => s === socket).forEach(socket => {
      socket.emit(message, data)
    })
  }
}

module.exports = socketApi
