import React from 'react'
import PropTypes from 'prop-types'

import './style.css'

import Temperature from '../../../../formats/Temperature'

export default class Reading extends React.Component {
  constructor (props) {
    super(props)
    // Bindings
    this.getIcon = this.getIcon.bind(this)
    this.getName = this.getName.bind(this)
    this.getFormattedReading = this.getFormattedReading.bind(this)
    this.options = {
      build: ['withBackground', 'withLine', 'withSideShade', 'withInfo', 'withActive', 'withImage'],
      padding: { top: 8, bottom: 8, right: 0, left: 0 },
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
        {/* <div className='reading-type'> */}
        {/* <img className='reading-icon' src={this.getIcon()} /> */}
        {/* <div className='reading-name'> */}
        {/* {this.getName()} */}
        {/* </div> */}
        {/* </div> */}
        {/* <div className='current-reading'> */}
        {/* {this.getFormattedReading()} */}
        {/* </div> */}
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
