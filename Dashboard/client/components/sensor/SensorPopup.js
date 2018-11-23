import React from 'react'
import Temperature from './formats/Temperature'
import SensorHistory from './SensorHistory'
import history from '../../History';

export default class SensorPopup extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            selected : null
        }
        console.log(props)
        this.options = {
            build: ['withBackground', 'withGridLines', 'withFullShadow', 'withLine','withHoverLine', 'withInfo', 'withLabels', 'withLastUpdated'],
            padding: {top: 20, bottom: 20, right: 20, left: 20},
            fontsize: 14,
            name: props.data.data.name,
            aesthetics: {
                gridLines: {width: 1},
                line: {width: 2}
            }
        }
        document.addEventListener("click", (e) => {
            if(e.target.className === "sensor-popup-wrapper"){
                this.props.dispatch({popup: false})
            }
        })
    }
    render(){
        return (
            <div className="sensor-popup-wrapper">
                <div className="sensor-popup">
                    <h1>Sensor Information</h1>
                    <div onClick={() => this.props.dispatch({popup: false})} className="close"></div>
                    <Temperature options={this.options}
                        data={this.props.data.data} 
                        height="200"></Temperature>
                    <h1>Sensor History</h1>
                    <SensorHistory data={this.props.data.data.data} ></SensorHistory>
                <button className="basic" onClick={() => history.push("/history/" + this.props.data.data.id)}>See full history</button>
                </div>
            </div>
        )
    }
}