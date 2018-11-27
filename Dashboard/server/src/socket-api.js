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
    socket.id = this.clients.length
    this.clients.push(socket)
    if (this.data.length !== 0) {
      this.broadcastTo(socket, 'sensorReadings', this.lastReadings(), this.sensors)
    }
    socket.on('setType', (data) => {
      socket.type = data.type;
    })
    socket.on('sensorReadings', (data) => {
      socket.lastSent = new Date();
      if(!this.socketExists(socket, this.sensors)){
        this.sensors.push(socket);
      }
      this.addSensorData(data, socket.type);
      this.saveReadings();
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
    for(let i in this.knownSensors){
      let curTime = this.knownSensors[i].lastUpdate;
      if(new Date() - new Date(curTime) > 5000){
        this.knownSensors[i].active = false
      }
    }
    this.sensors.forEach((e, idx) => {
      if(e.connected == false){
        this.sensors.splice(idx, 1);
      }
    })
  }
  socketExists (socket, array){
    for(let i in array){
      if(array[i].id == socket.id)
        return true;
    }
  }
  updateSensors (id, name) {
    for (let s in this.unknownSensors) {
      if (this.unknownSensors[s].id === id) {
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
        readings.known.push({ ...currentSensor, data: last })
      } else {
        readings.known.push({ ...currentSensor, data: []})
      }
    }
    return readings
  }
  populateKnownSensors (){
    this.db.setCollection("sensors");
    this.db.findAll().then((data) => {
      data.forEach(arr => {
        if(arr.data){
          if(arr.data.length >= 10){
            arr.data = arr.data.splice(-10, 10)
          }
        }
      })
      this.knownSensors = data;
    })
  }
  saveReadings (){
    for(let reading in this.knownSensors){
      if(this.knownSensors[reading].data.length >= 40){
        let saveData = this.knownSensors[reading].data.splice(0, 10);
        this.db.findDocument("id", this.knownSensors[reading].id).then((data) => {
          data.data = data.data ? data.data.concat(saveData) : saveData;
          data.data = data.data.length >= 500 ? data.sensors.splice(10, data.data.length-1): data.data;
          data.lastUpdate = saveData[saveData.length-1].time;
          this.db.update("id", this.knownSensors[reading].id, data)
        })
      }
    }
  }
  addSensorData (data, type){
    switch(type){
      case 'temp':
        data.data = parseInt(data.data)
        break;

    }
    let added = false;
    let date =  new Date().toUTCString();
    let id = Math.random().toString(13).replace('0.', '')
    for (let d in this.unknownSensors) {
      if (this.unknownSensors[d].id === data.id) {
        this.unknownSensors[d].data.push({ reading: data.data, time: date, id: id })
        this.unknownSensors[d].lastUpdate = date
        this.unknownSensors[d].active = data.active;
        added = true;
      }
    }
    for(let d in this.knownSensors){
      if(this.knownSensors[d].id == data.id){
        this.knownSensors[d].data.push({reading: data.data, time: date, id:id, type});
        this.knownSensors[d].lastUpdate = date
        this.knownSensors[d].active = data.active;
        added = true;
      }
    }
    if(added == false){
      this.db.setCollection("sensors");
      this.db.findDocument("id", data.id).then(result => {
        if(result === null && !this.socketExists(data, this.unknownSensors)){
          this.unknownSensors.push({id: data.id, type, data: [{reading: data.data, time: data,id: id}], active: data.active});
        } else if(result !== null  && !this.socketExists(data, this.knownSensors)) { 
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
