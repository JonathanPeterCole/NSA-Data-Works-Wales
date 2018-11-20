import React from 'react'
import Graph from '../../../library/graph'

export default class Temperature extends React.Component {
    constructor(props){
        super(props)
    }
    componentDidMount(){
        this.graph = new Graph(this.refs.graph, this.refs.parent, {top: 4, bottom: 4, left: 10, right: 10});
        window.addEventListener("resize", e => this.graph.resize(e))
    }
    componentDidUpdate(){
        this.graph.addData(this.props.data.data)
    }
    render(){
        return (
            <div className="content" ref="parent">
                <h2>Reading : {this.props.data.data}</h2>
                <canvas width="100%" ref="graph" height={this.props.height}></canvas>
            </div>
        )
    }
}