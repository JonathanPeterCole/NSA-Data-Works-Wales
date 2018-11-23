import React from 'react'

export default class SensorReadingRow extends React.Component {
    constructor(props){
        super(props)    
    }
    render(){
        return (
            <tr>
                <td>{this.props.data.time}</td>
                <td>{this.props.data.reading}</td>
            </tr>
        )
    }
}