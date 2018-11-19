class socketApi {
  constructor(db){
    this.clients = [];
    this.data = [];
    this.sensors = [];
    this.knownSensors = [];
    this.unknownSensors = [];
    this.db = db;
  }
  connect(socket){
    socket.id = this.clients.length;
    this.clients.push(socket)
    if(this.data.length != 0){
      let lastReadings = this.lastReadings
      this.broadcastTo(socket, "sensorReadings", this.lastReadings())
    }
    socket.on('sensorReadings', (data) => {
      this.addSensorData(data);
    })
    socket.on("updateSettings", (data) => {
      this.saveSensor(data.id, data.name)
      this.updateSensors(data.id, data.name)
      this.broadcastAll("sensorReadings", this.lastReadings())
    });
    socket.on('disconnect', () => {
      this.removeClient(socket.id)
    })
    setInterval(() => {
      this.broadcastAll("sensorReadings", this.lastReadings())
    }, 1000)
  }
  updateSensors(id, name){
    for(let s in this.unknownSensors){
      if(this.unknownSensors[s].id === id){
        this.unknownSensors[s].name = name
        this.knownSensors.push(this.unknownSensors[s])
        this.unknownSensors.splice(s, 1);
      }
    }
    for(let s in this.knownSensors){
      if(this.knownSensors[s].id === id){
        this.knownSensors[s].name = name
      }
    }
  }
  lastReadings(){
    let readings = {known: [], unknown: []};
    for(let reading in this.knownSensors){
      let last = this.knownSensors[reading].data[this.knownSensors[reading].data.length - 1];
      readings.known.push({...this.knownSensors[reading], data: last})
    }
    for(let reading in this.unknownSensors){
      let last = this.unknownSensors[reading].data[this.unknownSensors[reading].data.length - 1];
      readings.unknown.push({...this.unknownSensors[reading], data: last})  ;
    }
    return readings;
  }
  addSensorData(data){
    let added = false;
    for(let d in this.unknownSensors){
      if(this.unknownSensors[d].id == data.id){
        this.unknownSensors[d].data.push(data.data);
        added = true;
      }
    }
    for(let d in this.knownSensors){
      if(this.knownSensors[d].id == data.id){
        this.knownSensors[d].data.push(data.data);
        added = true;
      }
    }
    if(added == false){
      this.db.setCollection("sensors");
      this.db.findDocument("id", data.id, (result) => {
        if(result === null){
          this.unknownSensors.push({id: data.id, data: [data.data]});
        } else { 
          this.knownSensors.push({id: data.id, data: [data.data], name:result.name})
        }
      })
    }
  }
  hasSensor(id){
    for(let d in this.knownSensors){
      if(this.knownSensors[d].id == id){
        return true
      }
    }
    return false;
  }
  removeClient(id){
    for(let client in this.clients){
      if(this.clients[client].id === id){
        this.clients.splice(client, 1)
      }
    }
  } 
  saveSensor(id, name){
    this.db.setCollection("sensors");
    if(this.hasSensor(id)){
      console.log("okay")
      this.db.update("id", id, {name});
    } else {
      console.log("ok")
      this.db.insert({id, name})
    }
  }
  findSensor(id){
    this.db.setCollection("sensors");
    this.db.findDocument("id", id, (result) => {
    }); 
  }
  broadcastAll( message, data, exceptions = []){
    this.clients.filter(socket => !exceptions.includes(socket)).forEach(socket => {
      socket.emit(message, data)
    }) 
  } 
  broadcastTo(socket, message, data){
    this.clients.filter(s => s===socket).forEach(socket => {
      socket.emit(message, data)
    }) 
  }
}

module.exports = socketApi
