import React from 'react'

export default class UnknownSensor extends React.Component {
    constructor(props){
        super(props)
        console.log(props)
    }
    render(){
        return (
            <div className="sensor">
                <div className="data">
                    <div className="header">
                        <h1>Unidentified sensor</h1>
                    </div>
                    <div className="content">
                        {/* <h1>{this.props.data.id}</h1> */}
                        <h2>Reading : <span>{this.props.data.data}</span></h2>
                        <button onClick={() => {
                            this.props.popup((element) => {
                                
                            }, {name: 'Unidentified sensor', id: this.props.data.id})
                        }}>Identify</button>
                    </div>
                </div>
            </div>
        )
    }
}