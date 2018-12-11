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
      outerPadding: { top: 8, bottom: 8, left: 0, right:0 },
      innerPadding: { top: 0, bottom: 0, left: 0, right: 0 },
      fontsize: 14,
      active: true,
      type: this.props.type,
      aesthetics: {
      }
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
  type: PropTypes.string,
  online: PropTypes.bool,
  readings: PropTypes.array
}
