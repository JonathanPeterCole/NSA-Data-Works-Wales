import React from 'react'
import Temperature from './formats/Temperature'

export default class UnknownSensor extends React.Component {
    constructor(props){
        super(props)    
        this.options = {
            build: ['withBackground', 'withLine','withSideShade', 'withInfo', 'withActive'],
            padding: {top: 8, bottom: 8, right: 0, left: 0},
            fontsize: 14,
            name: "Unidentified",
            active: true
        }
    }
    render(){
        return (
            <div className="sensor">
                <div className="data">
                    {/* <div className="header">
                        <h1 onClick={() => {

                        this.props.dispatch({id: this.props.data.id, popup: true})
                        }}>{this.props.data.name}</h1>
                    </div> */}
                    <Temperature options={this.options} 
                    height="60" data={this.props.data} ></Temperature>
                    <button onClick={() => {
                        this.props.dispatch({...this.props.data, name:'Unidentified', identify: true})
                    }}>Identify</button>
                </div>
            </div>
        )
    }
}