import React from 'react'
import socketio from 'socket.io-client'
import UnknownSensor from './UnknownSensor'
import KnownSensor from './KnownSensor'
import IdentifyPrompt from './IdentifyPrompt'
import SensorPopup from './SensorPopup'
const Config = require('../../../config/config.json')

export default class App extends React.Component {
    constructor(props){
        super(props)
        this.socket = socketio.connect("http://"+Config.IP+":3000/websocket")
        this.state = {
            sensorReadings: {known: [], unknown: []},
            identifyprompt: false,
            sensorpopup: false,
            sensorpopupinfo: null,
            popupinfo: null
        }
        this.socket.on("sensorReadings", (data) => {
            this.setState({
                sensorReadings: data
            })
        })
    }
    showIdentifyPrompt(cb, popupinfo){
        this.setState({popup: !this.state.identifyprompt, popupinfo}, () => cb(this.refs.prompt)); // in callback so element exists prior to calling.
    }
    updateSensor(id, name){
        this.socket.emit("updateSettings",{
            id: id,
            name: name
        })
        this.setState({identifyprompt: !this.state.identifyprompt});
    }
    identifyPromptTrigger(){
        this.setState({identifyprompt: !this.state.identifyprompt});
    }
    showSensorPopup(sensorpopupinfo){
        this.setState({sensorpopup: !this.state.sensorpopup, sensorpopupinfo})
    }
    render(){
        return (
            <div>
                <div className="sensors">
                    <h1>Known sensors</h1>
                    {this.state.sensorReadings.known.map((data, i) => {
                        return <KnownSensor detailpopup={this.showSensorPopup.bind(this)} popup={this.showIdentifyPrompt.bind(this)} key={i} data={data}></KnownSensor>
                    })}
                </div>
                <div className="sensors">
                    <h1>Unknown sensors</h1>
                    {this.state.sensorReadings.unknown.map((data, i) => {
                        return <UnknownSensor popup={this.identifyPromptTrigger.bind(this)} key={i} data={data}></UnknownSensor>
                    })}
                </div>
                {this.state.identifyprompt ? 
                    <IdentifyPrompt ref="prompt" close={this.identifyPromptTrigger.bind(this)} updateSensor={this.updateSensor.bind(this)} data={this.state.popupinfo}></IdentifyPrompt>:null
                }
                {this.state.sensorpopup ? 
                    <SensorPopup data={this.state.sensorpopupinfo}></SensorPopup>:null
                }
            </div>
        )
    }
}