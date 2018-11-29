import React from 'react'
import PropTypes from 'prop-types'

import './style.css'

export default class ModalHeader extends React.Component {
  render () {
    return (
      <div className='modal-header'>
        {this.props.children}
      </div>
    )
  }
}

ModalHeader.propTypes = {
  children: PropTypes.element
}
