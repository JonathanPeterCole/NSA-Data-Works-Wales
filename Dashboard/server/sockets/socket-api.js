class socketApi {
  constructor(){
    this.clients = [];
    this.data = [];
  }
  connect(socket){
    socket.id = this.clients.length;
    this.clients.push(socket)
    socket.on('sensorReadings', (data) => {
      this.data.push(data);
      this.broadcast([socket], "sensorReadings" , {...data});
    })
    socket.on('disconnect', () => {
      this.removeClient(socket.id)
    })
  }

  removeClient(id){
    for(let client in this.clients){
      if(this.clients[client].id === id){
        this.clients.splice(client, 1)
      }
    }
  }

  broadcast(exceptions, message, data){
    this.clients.filter(socket => !exceptions.includes(socket)).forEach(socket => {
      socket.emit(message, data)
    }) 
  }
}

module.exports = socketApi
