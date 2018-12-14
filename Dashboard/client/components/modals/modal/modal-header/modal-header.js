import React from 'react'
import PropTypes from 'prop-types'

import IconButton from '../../../buttons/icon-button/icon-button'

import './style.css'

import CloseIcon from './img/close.svg'

export default class ModalHeader extends React.Component {
  render () {
    return (
      <div className='modal-header'>
        <div className='header-content'>
          {this.props.children}
        </div>
        <IconButton className='close-btn' image={CloseIcon} hover='shrink' onClick={this.props.close} />
      </div>
    )
  }
}

ModalHeader.propTypes = {
  children: PropTypes.node,
  close: PropTypes.func
}
