import React from 'react'
import PropTypes from 'prop-types'

import IconButton from '../buttons/icon-button/icon-button'

import './style.css'

import CloseIcon from './img/close.svg'

export default class Modal extends React.Component {
  render () {
    return (
      <div className='modal'>
        {this.props.show && (
          <div className='modal-overlay'>
            <div className='modal-container'>
              <IconButton className='close-btn' image={CloseIcon} hover='shrink' onClick={this.props.close} />
              {this.props.children}
            </div>
          </div>
        )}
      </div>
    )
  }
}

Modal.propTypes = {
  show: PropTypes.bool,
  close: PropTypes.func,
  children: PropTypes.element
}
