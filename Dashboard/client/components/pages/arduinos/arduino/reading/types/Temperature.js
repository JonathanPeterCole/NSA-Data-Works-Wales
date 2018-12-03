import React from 'react'
import PropTypes from 'prop-types'
import Graph from '../../../../../../library/graph'

import './style.css'

export default class Temperature extends React.Component {
  componentDidMount () {
    this.graph = new Graph(this.refs.graph, this.refs.parent, this.props.options)
    window.addEventListener('resize', e => this.graph.resize(e))
    this.graph.setData([this.props.data.reading ])
    this.graph.setLastUpdated(this.props.data.lastUpdate)
    this.graph.setActive(this.props.data.active)
  }
  componentDidUpdate () {
    // this.graph.setName(this.props.data.name ? this.props.data.name : this.props.options.name)
    console.log(this.props.data.reading)
    this.graph.addData(this.props.data.reading)
    this.graph.setLastUpdated(this.props.data.lastUpdate)
    this.graph.setActive(this.props.data.active)
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
  data: PropTypes.object,
  onClick: PropTypes.func,
  options: PropTypes.object
}
