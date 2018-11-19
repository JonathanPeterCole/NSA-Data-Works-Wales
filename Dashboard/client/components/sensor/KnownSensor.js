import React from 'react'
import Graph from '../../library/graph'

export default class KnownSensor extends React.Component {
    constructor(props){
        super(props)
        this.graph = null;
    }
    componentDidMount(){
        this.graph = new Graph(this.refs.graph, this.refs.parent);
        window.addEventListener("resize", e => this.graph.resize(e))
    }
    componentDidUpdate(){
        // console.log(this.props)
        this.graph.addData(this.props.data.data)
    }
    render(){
        return (
            <div className="sensor" >
                <div className="data">
                    <div className="header">
                        <h1>{this.props.data.name}</h1>
                    </div>
                    <div className="content" ref="parent">
                        <h2>Reading : {this.props.data.data}</h2>
                        <canvas width="100%" ref="graph" height="20"></canvas>
                        <button onClick={() => {
                            this.props.popup((popup) => {
                            }, {name: this.props.data.name, id : this.props.data.id})
                        }}>Edit</button>
                    </div>
                    <button onClick={() => {
                        this.props.popup((popup) => {
                            
                        }, {name: this.props.data.name, id : this.props.data.id})
                    }}>Edit</button>
                </div>
            </div>
        )
    }
}