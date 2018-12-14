import React from 'react'
import PropTypes from 'prop-types'
import { CSSTransition } from 'react-transition-group'

import './style.css'

export default class Modal extends React.Component {
  constructor (props) {
    super(props)
    // Bindings
    this.getClassName = this.getClassName.bind(this)
    this.overlayClick = this.overlayClick.bind(this)
  }

  getClassName () {
    if (this.props.className) {
      return 'modal ' + this.props.className
    } else {
      return 'modal'
    }
  }

  overlayClick (event) {
    // Check that the click event has not been triggered on a child element
    if (event.target === event.currentTarget) {
      this.props.close()
    }
  }

  render () {
    return (
      <div className={this.getClassName()}>
        <CSSTransition
          in={this.props.show}
          classNames='modal-animation'
          timeout={300}
          unmountOnExit>
          <div className='modal-overlay' onClick={this.overlayClick}>
            <div className='modal-container'>
              {this.props.children}
            </div>
          </div>
        </CSSTransition>
      </div>
    )
  }
}

Modal.propTypes = {
  className: PropTypes.string,
  show: PropTypes.bool,
  close: PropTypes.func,
  children: PropTypes.node
}
