import React from 'react'
import PropTypes from 'prop-types'
import { CSSTransition } from 'react-transition-group'

import IconButton from '../../buttons/icon-button/icon-button'

import './style.css'

import CloseIcon from './img/close.svg'

export default class Modal extends React.Component {
  constructor (props) {
    super(props)
    // Bindings
    this.overlayClick = this.overlayClick.bind(this)
  }

  overlayClick (event) {
    // Check that the click event has not been triggered on a child element
    if (event.target === event.currentTarget) {
      this.props.close()
    }
  }

  render () {
    return (
      <div className='modal'>
        <CSSTransition
          in={this.props.show}
          classNames='modal-animation'
          timeout={300}
          unmountOnExit>
          <div className='modal-overlay' onClick={this.overlayClick}>
            <div className='modal-container'>
              <IconButton className='close-btn' image={CloseIcon} hover='shrink' onClick={this.props.close} />
              {this.props.children}
            </div>
          </div>
        </CSSTransition>
      </div>
    )
  }
}

Modal.propTypes = {
  show: PropTypes.bool,
  close: PropTypes.func,
  children: PropTypes.element
}
