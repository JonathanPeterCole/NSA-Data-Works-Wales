import React from 'react'
import socketio from 'socket.io-client'
import UnknownSensor from './UnknownSensor'
import KnownSensor from './KnownSensor'
import IdentifyPrompt from './IdentifyPrompt'

export default class App extends React.Component {
    constructor(props){
        super(props)
        this.socket = socketio.connect("http://localhost:3000/websocket")
        this.state = {
            sensorReadings: {known: [], unknown: []},
            popup: false,
            popupinfo: null
        }
        this.socket.on("sensorReadings", (data) => {
            this.setState({
                sensorReadings: data
            })
        })
    }
    showPopup(cb, popupinfo){
        this.setState({popup: !this.state.popup, popupinfo}, () => cb(this.refs.prompt)); // in callback so element exists prior to calling.
    }
    updateSensor(id, name){
        this.socket.emit("updateSettings",{
            id: id,
            name: name
        })
        this.setState({popup: !this.state.popup});
    }
    render(){
        return (
            <div>
                <div className="sensors">
                    <h1>Known sensors</h1>
                    {this.state.sensorReadings.known.map((data, i) => {
                        return <KnownSensor popup={this.showPopup.bind(this)} key={i} data={data}></KnownSensor>
                    })}
                </div>
                <div className="sensors">
                    <h1>Unknown sensors</h1>
                    {this.state.sensorReadings.unknown.map((data, i) => {
                        return <UnknownSensor popup={this.showPopup.bind(this)} key={i} data={data}></UnknownSensor>
                    })}
                </div>
                {this.state.popup ? 
                    <IdentifyPrompt ref="prompt" updateSensor={this.updateSensor.bind(this)} data={this.state.popupinfo}></IdentifyPrompt>:null
                }
            </div>
        )
    }
}