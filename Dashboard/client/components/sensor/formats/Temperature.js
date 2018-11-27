import React from 'react'
import Graph from '../../../library/graph'

export default class Temperature extends React.Component {
    constructor(props){
        super(props)
    }
    componentDidMount(){
        this.graph = new Graph(this.refs.graph, this.refs.parent, this.props.options);
        window.addEventListener("resize", e => this.graph.resize(e))
        this.graph.setData(this.props.data.data)
        this.graph.setLastUpdated(this.props.data.lastUpdate)
    }
    componentDidUpdate(){
        this.graph.setName(this.props.data.name ? this.props.data.name: this.props.options.name)
        this.graph.setData(this.props.data.data)
        this.graph.setLastUpdated(this.props.data.lastUpdate)
        this.graph.setActive(this.props.data.active)
    }
    render(){
        return (
            <div className="content" ref="parent">
                <canvas width="100%" ref="graph" height={this.props.height} onClick={this.props.onClick ? () => {this.props.onClick()} : null}></canvas>
            </div>
        )
    }
}