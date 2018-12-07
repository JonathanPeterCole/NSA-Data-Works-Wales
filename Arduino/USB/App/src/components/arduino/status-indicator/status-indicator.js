import React from 'react'
import PropTypes from 'prop-types'
import { CSSTransition } from 'react-transition-group'

import Spinner from '../../spinner/spinner'

import ConnectedIcon from './img/connected.svg'
import DisconnectedIcon from './img/disconnected.svg'
import ErrorIcon from './img/error.svg'

import './style.css'

export default class StatusIndicator extends React.Component {
  render () {
    return (
      <div className='status-indicator'>
        <CSSTransition
          in={this.props.status === 'connecting'}
          classNames='status-transition'
          timeout={{ enter: 200, exit: 0 }}
          unmountOnExit>
          <Spinner pathClass='searching-path' />
        </CSSTransition>
        <CSSTransition
          in={this.props.status === 'connected'}
          classNames='status-transition'
          timeout={{ enter: 200, exit: 0 }}
          unmountOnExit>
          <img src={ConnectedIcon} />
        </CSSTransition>
        <CSSTransition
          in={this.props.status === 'disconnected'}
          classNames='status-transition'
          timeout={{ enter: 200, exit: 0 }}
          unmountOnExit>
          <img src={DisconnectedIcon} />
        </CSSTransition>
        <CSSTransition
          in={this.props.status === 'error'}
          classNames='status-transition'
          timeout={{ enter: 200, exit: 0 }}
          unmountOnExit>
          <img src={ErrorIcon} />
        </CSSTransition>
      </div>
    )
  }
}

StatusIndicator.propTypes = {
  status: PropTypes.string
}
