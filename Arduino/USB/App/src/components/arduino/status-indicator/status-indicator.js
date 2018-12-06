import React from 'react'
import PropTypes from 'prop-types'

import Spinner from '../../spinner/spinner'

import ConnectedIcon from './img/connected.svg'
import DisconnectedIcon from './img/disconnected.svg'
import ErrorIcon from './img/error.svg'

import './style.css'

export default class StatusIndicator extends React.Component {
  render () {
    return (
      <div className='status-indicator'>
        { this.props.status === 'connecting' &&
          <Spinner />
        }
        { this.props.status === 'connected' &&
          <img src={ConnectedIcon} />
        }
        { this.props.status === 'disconnected' &&
          <img src={DisconnectedIcon} />
        }
        { this.props.status === 'error' &&
          <img src={ErrorIcon} />
        }
      </div>
    )
  }
}

StatusIndicator.propTypes = {
  status: PropTypes.string
}
