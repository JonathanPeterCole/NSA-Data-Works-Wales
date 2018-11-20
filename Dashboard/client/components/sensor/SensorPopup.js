import React from 'react'
import Temperature from './formats/Temperature'

export default class SensorPopup extends React.Component {
    constructor(props){
        super(props)
        console.log(props)
    }
    render(){
        return (
            <div className="sensor-popup-wrapper">
                <div className="sensor-popup">
                    <h1>{this.props.data.name}</h1>
                    <Temperature data={this.props.data.data} height="200"></Temperature>
                </div>
            </div>
        )
    }
}