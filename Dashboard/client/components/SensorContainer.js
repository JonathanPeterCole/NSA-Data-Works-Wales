import React from 'react'

export default class SensorContainer extends React.Component {
    constructor(props){
        super(props)
        console.log(props)
    }
    render(){
        return (
            <div>
                {this.props.data.temp}
            </div>
        )
    }
}