import React from 'react'
import PropTypes from 'prop-types'
import Graph from '../../../library/graph'

export default class Temperature extends React.Component {
  componentDidMount () {
    this.graph = new Graph(this.refs.graph, this.refs.parent, this.props.options)
    window.addEventListener('resize', e => this.graph.resize(e))
    this.graph.setData(this.props.data.data)
    this.graph.setLastUpdated(this.props.data.lastUpdate)
  }
  componentDidUpdate () {
    this.graph.setName(this.props.data.name ? this.props.data.name : this.props.options.name)
    this.graph.setData(this.props.data.data)
    this.graph.setLastUpdated(this.props.data.lastUpdate)
    this.graph.setActive(this.props.data.active)
  }
  render () {
    return (
      <div className='content' ref='parent'>
        <canvas width='100%' ref='graph' height={this.props.height} onClick={this.props.onClick ? () => { this.props.onClick() } : null} />
      </div>
    )
  }
}

Temperature.propTypes = {
  options: PropTypes.object,
  data: PropTypes.object,
  height: PropTypes.string,
  onClick: PropTypes.func
}