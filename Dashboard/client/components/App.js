import React from 'react'
import Sensors from './sensor/Sensors'
export default class App extends React.Component {
    constructor(props){
        super(props)
    }
    updateReadings(){

    }
    render(){
        return (
            <div>
                <Sensors></Sensors>
            </div>
        )
    }
}