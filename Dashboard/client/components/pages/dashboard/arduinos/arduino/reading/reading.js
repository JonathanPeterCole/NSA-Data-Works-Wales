import React from 'react'
import PropTypes from 'prop-types'

import './style.css'

import Temperature from '../../../../../formats/Temperature'

export default class Reading extends React.Component {
  constructor (props) {
    super(props)
    // Bindings
    this.options = {
      build: ['withBackground', 'withLine', 'withSideShade', 'withInfo', 'withActive', 'withImage'],
      outerPadding: { top: 8, bottom: 8, left: 0, right: 0 },
      innerPadding: { top: 0, bottom: 0, left: 0, right: 0 },
      fontsize: 14,
      type: props.type,
      name: props.name,
      active: props.online,
      aesthetics: {
      }
    }
  }
  componentDidUpdate () {
    this.options = {
      ...this.options,
      type: this.props.type,
      name: this.props.name,
      active: this.props.online
    }
  }
  render () {
    return (
      <div className='arduino-reading'>
        <Temperature options={this.options}
          data={this.props.readings}
          onClick={this.onClick}
          online={this.props.online} />
      </div>
    )
  }
}

Reading.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  online: PropTypes.bool,
  readings: PropTypes.array
}
