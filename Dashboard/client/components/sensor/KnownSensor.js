import React from 'react'

export default class KnownSensor extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div className="sensor">
                <div className="data">
                    <div className="header">
                        <h1>{this.props.data.name}</h1>
                    </div>
                    <div className="content">
                        <h2>Reading : {this.props.data.data}</h2>
                        <button onClick={() => {
                            this.props.popup((popup) => {
                                
                            }, {name: this.props.data.name, id : this.props.data.id})
                        }}>Edit</button>
                    </div>
                </div>
            </div>
        )
    }
}