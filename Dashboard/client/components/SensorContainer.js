import React from 'react'

export default class SensorContainer extends React.Component {
    constructor(props){
        super(props)
        console.log(props)
    }
    render(){
        return (
            <div className="sensor">
                <div className="data">
                    <h1>{this.props.data.readings[this.props.data.readings.length -1]}</h1>
                    <span>{this.props.data.client}</span>
                </div>
            </div>
        )
    }
}