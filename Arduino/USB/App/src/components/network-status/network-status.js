import React from 'react'
import PropTypes from 'prop-types'

import Spinner from '../spinner/spinner'

import './style.css'
import ConnectedIcon from './img/connected.svg'

export default class NetworkStatus extends React.Component {
  constructor (props) {
    super(props)
    // Bindings
    this.getClassName = this.getClassName.bind(this)
  }

  getClassName () {
    if (this.props.connected && this.props.show) {
      return 'network-status show online'
    } else if (!this.props.connected && this.props.show) {
      return 'network-status show offline'
    } else if (this.props.connected && !this.props.show) {
      return 'network-status online'
    } else {
      return 'network-status offline'
    }
  }

  render () {
    return (
      <div className={this.getClassName()}>
        {this.props.connected &&
          <div className='status'>
            <img className='status-icon' src={ConnectedIcon} />
            <div className='status-message'>Connected to Data Works</div>
          </div>
        }
        {!this.props.connected &&
          <div className='status'>
            <Spinner className='status-icon' />
            <div className='status-message'>Attempting to connect...</div>
          </div>
        }
      </div>
    )
  }
}

NetworkStatus.propTypes = {
  show: PropTypes.bool,
  connected: PropTypes.bool
}
