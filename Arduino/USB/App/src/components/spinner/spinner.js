import React from 'react'
import PropTypes from 'prop-types'

import './style.css'

export default class Spinner extends React.Component {
  render () {
    return (
      <div className={this.props.className}>
        <svg className='spinner circle' viewBox='0 0 50 50'>
          <circle className='path' cx='25' cy='25' r='20' fill='none' stroke={this.props.colour} />
        </svg>
      </div>
    )
  }
}

Spinner.defaultProps = {
  colour: '#ffffff'
}

Spinner.propTypes = {
  className: PropTypes.string,
  colour: PropTypes.string
}
