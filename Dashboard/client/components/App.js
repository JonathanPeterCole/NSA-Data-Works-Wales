import React from 'react'
import {Sensors} from '../containers/Sensors'
import {FullHistory} from '../containers/FullHistory'

import { Route } from 'react-router-dom'
export default class App extends React.Component {
    constructor(props){
        super(props)
    }
    updateReadings(){

    }
    render(){
        return (
            <div>
                <Route path="/" exact component={Sensors} />
                <Route path="/history/:id" exact component={FullHistory} />
            </div>
        )
    }
}