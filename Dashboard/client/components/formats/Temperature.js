import React from 'react'
import PropTypes from 'prop-types'
import Graph from '../../library/graph'

import './style.css'

export default class Temperature extends React.Component {
  componentDidMount () {
    this.graph = new Graph(this.refs.graph, this.refs.parent, this.props.options)
    window.addEventListener('resize', e => this.graph.resize(e))
    this.graph.setData(this.props.data.slice(-10, this.props.data.length - 1))
    this.graph.setLastUpdated(this.props.data.lastUpdate)
    this.graph.setActive(this.props.online)
  }
  componentDidUpdate () {
    this.graph.setOptions(this.props.options)
    this.graph.setData(this.props.data.slice(-10, this.props.data.length - 1))
    this.graph.setLastUpdated(this.props.data.lastUpdate)
    this.graph.setActive(this.props.online)
  }
  render () {
    return (
      <div className='content' ref='parent'>
        <canvas ref='graph' onClick={this.props.onClick ? () => { this.props.onClick() } : null} />
      </div>
    )
  }
}

Temperature.propTypes = {
  data: PropTypes.array,
  onClick: PropTypes.func,
  online: PropTypes.bool,
  options: PropTypes.object
}
