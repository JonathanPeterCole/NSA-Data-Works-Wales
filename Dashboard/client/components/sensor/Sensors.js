import React from 'react'
import socketio from 'socket.io-client'
import {UnknownSensor} from '../../containers/UnknownSensor'
import {KnownSensor} from '../../containers/KnownSensor'
import {IdentifyPrompt} from '../../containers/IdentifyPrompt'
import {SensorPopup} from '../../containers/SensorPopup'
const Config = require('../../../config/config.json')

export default class App extends React.Component {
    constructor(props){
        super(props)
        this.socket = socketio.connect("http://"+Config.IP+":3000/websocket")
        // console.log(props)
        this.socket.on("sensorReadings", (data) => {
            // console.log(data)
            // data.known.forEach(k=> console.log(k) )
            // console.log(data)
            this.props.dispatch(data)
            // data.unknown.forEach(k => k.forEach(r => this.props.dispatch(r.id, r)))
            // this.props.dispatch(data.id, data.data)
            // this.setState({
            //     sensorReadings: data
            // })
        })
    }
    showIdentifyPrompt(){
        this.setState({popup: !this.state.identifyprompt}); // in callback so element exists prior to calling.
    }
    updateSensor(id, name){
        this.socket.emit("updateSettings",{
            id: id,
            name: name
        })
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
                    {this.props.sensors.known.map((data, i) => {
                        return <KnownSensor  key={i} data={data}></KnownSensor>
                    })}
                </div>
                <div className="sensors">
                    <h1>Unknown sensors</h1>
                    {this.props.sensors.unknown.map((data, i) => {
                        return <UnknownSensor key={i} data={data}></UnknownSensor>
                    })}
                </div>
                {this.props.sensors.active.identify ? 
    
                    <IdentifyPrompt ref="prompt" close={this.identifyPromptTrigger.bind(this)} updateSensor={this.updateSensor.bind(this)} ></IdentifyPrompt>:null
                }
                {this.props.sensors.active.popup ? 
                    <SensorPopup ></SensorPopup>:null}
                
            </div>
        )
    }
}