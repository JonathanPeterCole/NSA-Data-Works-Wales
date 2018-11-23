class socketApi {
  constructor(db){
    this.clients = [];
    this.data = [];
    this.sensors = [];
    this.knownSensors = [];
    this.unknownSensors = [];
    this.db = db;
    setInterval(() => {
      if(this.clients.length !=0){
        this.broadcastAll("sensorReadings", this.lastReadings(), this.sensors)
      }
    }, 1500)
  }
  connect(socket){
    socket.id = this.clients.length;
    this.clients.push(socket)
    if(this.data.length != 0){
      this.broadcastTo(socket, "sensorReadings", this.lastReadings(), this.sensors)
    }
    socket.on('sensorReadings', (data) => {
      if(!this.socketExists(socket, this.sensors)){
        this.sensors.push(socket);
      }
      this.addSensorData(data);
      this.saveReadings();
    })
    socket.on("updateSettings", (data) => {
      this.saveSensor(data.id, data.name)
      this.updateSensors(data.id, data.name)
      this.broadcastAll("sensorReadings", this.lastReadings(), this.sensors)
    });
    socket.on('disconnect', () => {
      this.removeClient(socket.id)
    })
  }
  socketExists(socket, array){
    for(let i in array){
      if(array[i].id == socket.id)
        return true;
    }
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
      let last = this.knownSensors[reading].data.length <= 10 ?
       this.knownSensors[reading].data.slice(0, this.knownSensors[reading].data.length-1) : 
       this.knownSensors[reading].data.slice(this.knownSensors[reading].data.length -11 , this.knownSensors[reading].data.length-1)
      readings.known.push({...this.knownSensors[reading], data: last})
    }
    for(let reading in this.unknownSensors){
      let last = this.unknownSensors[reading].data.length <= 10 ?
       this.unknownSensors[reading].data.slice(0, this.unknownSensors[reading].data.length-1) : 
       this.unknownSensors[reading].data.slice(this.unknownSensors[reading].data.length -11 , this.unknownSensors[reading].data.length-1);
      readings.unknown.push({...this.unknownSensors[reading], data: last})  ;
    }
    return readings;
  }
  saveReadings(){
    for(let reading in this.knownSensors){
      if(this.knownSensors[reading].data.length >= 5){
        let saveData = this.knownSensors[reading].data.splice(0, 3);
        this.db.findDocument("id", this.knownSensors[reading].id).then((data, result) => {
          data.sensors = data.sensors ? data.sensors.concat(saveData) : saveData;
          data.sensors = data.sensors.length >= 500 ? data.sensors.splice(10, data.sensors.length-1): data.sensors;
          this.db.update("id", this.knownSensors[reading].id, data)
        })
      }
    }
  }
  addSensorData(data){
    let added = false;
    let date =  new Date().toUTCString();
    let id = Math.random().toString(13).replace('0.', '')
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
    for(let d in this.unknownSensors){
      if(this.unknownSensors[d].id == data.id){
        this.unknownSensors[d].data.push({reading: data.data, time: date, id:id});
        this.unknownSensors[d].lastUpdate = date
        added = true;
      }
    }
    for(let d in this.knownSensors){
      if(this.knownSensors[d].id == data.id){
        this.knownSensors[d].data.push({reading: data.data, time: date, id:id});
        this.knownSensors[d].lastUpdate = date
        added = true;
      }
    }
    if(added == false){
      this.db.setCollection("sensors");
      this.db.findDocument("id", data.id).then(result => {
        if(result === null && !this.socketExists(data, this.unknownSensors)){
          this.unknownSensors.push({id: data.id, data: [{reading: data.data, time: date, id:id}]});
        } else if(result !== null) { 
          this.knownSensors.push({id: data.id, data: [{reading: data.data, time: date, id:id}], name:result.name})
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
      this.db.update("id", id, {name});
    } else {
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
