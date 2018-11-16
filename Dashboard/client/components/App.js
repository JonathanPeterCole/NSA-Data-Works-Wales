import React from 'react'
import socketio from 'socket.io-client'
import SensorContainer from './SensorContainer'
import sensorLibrary from './../library/sensorLibrary'

export default class App extends React.Component {
    constructor(props){
        super(props)
        this.socket = socketio.connect("http://localhost:3000/websocket")
        this.state = {
            sensorReadings: []
        }
        this.sensorLibrary = new sensorLibrary()
        this.socket.on("sensorReadings", (data) => {
            this.sensorLibrary.addData(data)
            this.setState({
                sensorReadings: this.sensorLibrary.getReadings()
            })
            // console.log(this.state.sensorReadings)
        })
    }
    updateReadings(){

    }
    render(){
        return (
            <div>
                <div className="sensors">
                    {this.state.sensorReadings.map((data, i) => {
                        return <SensorContainer key={i} data={data}></SensorContainer>
                    })}
                </div>
            </div>
        )
    }
}