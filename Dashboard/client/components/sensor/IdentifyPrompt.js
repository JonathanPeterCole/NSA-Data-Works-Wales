import React from 'react'

export default class IdentiyPrompt extends React.Component {
    constructor(props){
        super(props)
        console.log(props)
    }
    render(){
        return (
            <div className="identify-prompt-wrapper">
                <div className="identify-prompt">
                    <div onClick={() => this.props.dispatch({identify: false})} className="close"></div>
                    <h1>Sensor Details</h1>
                    <div className="input">
                        <h1>Sensor ID</h1>
                        <input type="text" disabled value={this.props.data.id} />
                    </div>
                    <div className="input">
                        <h1>Sensor Name</h1>
                        <input type="text" defaultValue={this.props.data.name} onChange={e => this.setState({name: e.target.value})}/>
                    </div>
                    <button onClick={() => {
                        this.props.updateSensor(this.props.data.id, this.state.name)
                        this.props.dispatch({identify: false})
                    }}>Save</button>
                </div>
            </div>
        )
    }
}