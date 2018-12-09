import React from 'react'
import PropTypes from 'prop-types'

import Spinner from '../spinner/spinner'

import './style.css'
import ConnectedIcon from './img/connected.svg'

export default class NetworkStatus extends React.Component {
  render () {
    return (
      <div className={this.props.show ? 'network-status show' : 'network-status'}>
        <div className='status offline'>
          <Spinner className='status-icon' />
          <div className='status-message'>Attempting to connect...</div>
        </div>
        <div className={this.props.connected ? 'status online show' : 'status online'}>
          <img className='status-icon' src={ConnectedIcon} />
          <div className='status-message'>Connected to Data Works</div>
        </div>
      </div>
    )
  }
}

NetworkStatus.propTypes = {
  show: PropTypes.bool,
  connected: PropTypes.bool
}
