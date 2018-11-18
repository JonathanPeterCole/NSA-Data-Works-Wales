export default class sensorLibrary {
    constructor(){
        this.readings = [];
        this.clients = [];
    }
    addData(data){
        let client = this.addClient(data.id)
        console.log(data)
        this.addReading(data.data, client)
    }
    getReadings(){
        this.readings.forEach((r,i)=> {
            if(r.readings.length >= 30){ // AT 30 DELETE FROM ARRAY TO SAVE SPACE THEN SAVE IN DB?
                this.readings[i].readings.splice(0,29);
            }
        });
        return this.readings;
    }
    addClient(id){
        for(let client in this.clients){
            if(this.clients[client] == id){
                return this.clients[client];
            }
        } 
        return this.clients[this.clients.push(id) - 1]
    }
    addReading(reading, client){
        for(let index in this.readings){
            if(this.readings[index].client == client){
                this.readings[index].readings.push(reading)
                return true;
            }
        } 
        this.readings.push({readings: [reading], client});
    }
}