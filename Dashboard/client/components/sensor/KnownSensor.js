import React from 'react'

import Temperature from './formats/Temperature'

export default class KnownSensor extends React.Component {
    constructor(props){
        super(props)
        this.graph = null;
    }

    render(){
        return (
            <div className="sensor" >
                <div className="data">
                    <div className="header">
                        <h1 onClick={() => {

                        this.props.dispatch({id: this.props.data.id, popup: true})
                        }}>{this.props.data.name}</h1>
                    </div>
                    <Temperature height="40" data={this.props.data} ></Temperature>
                    <button onClick={() => {
                        this.props.dispatch({id: this.props.data.id, identify: true})
                    }}>Edit</button>
                </div>
            </div>
        )
    }
}