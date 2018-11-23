import React from 'react'
import socketio from 'socket.io-client'

import {Loading} from '../Loading'
import {UnknownSensor} from '../../containers/UnknownSensor'
import {KnownSensor} from '../../containers/KnownSensor'
import {IdentifyPrompt} from '../../containers/IdentifyPrompt'
import {SensorPopup} from '../../containers/SensorPopup'
const Config = require('../../../config/config.json')

export default class App extends React.Component {
    constructor(props){
        super(props)
        this.socket = socketio.connect("http://"+Config.IP+":3000/websocket")
        this.state = {
            loading: true,
            sensorpopup: false
        }
        this.socket.on("sensorReadings", (data) => {
            this.props.dispatch(data)
            this.setState({loading: false})
            console.log(data)
        })
    }
    updateSensor(id, name){
        this.socket.emit("updateSettings",{
            id: id,
            name: name
        })
    }
    showSensorPopup(sensorpopupinfo){
        this.setState({sensorpopup: !this.state.sensorpopup, sensorpopupinfo})
    }
    render(){
        return (
            this.state.loading? 
            <Loading></Loading>
            :
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
                    <IdentifyPrompt ref="prompt" updateSensor={this.updateSensor.bind(this)} ></IdentifyPrompt>:null
                }
                {this.props.sensors.active.popup ? 
                    <SensorPopup ></SensorPopup>:null}
                
            </div>
        )
    }
}