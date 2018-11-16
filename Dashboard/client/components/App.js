import React from 'react'
import socketio from 'socket.io-client'
import SensorContainer from './SensorContainer'

export default class App extends React.Component {
    constructor(props){
        super(props)
        this.socket = socketio.connect("http://localhost:3000/websocket")
        this.state = {
            sensorReadings: []
        }
        this.socket.on("sensorReadings", (data) => {
            this.setState({
                sensorReadings: data
            })
            console.log(this.state.sensorReadings)
        })
    }
    updateReadings(){

    }
    render(){
        return (
            <div>
                {this.state.sensorReadings.map((data, i) => {
                    return <SensorContainer key={i} data={data}></SensorContainer>
                })}
            </div>
        )
    }
}