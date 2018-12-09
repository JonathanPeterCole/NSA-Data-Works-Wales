import React from 'react'
import PropTypes from 'prop-types'

import './style.css'

export default class StatusText extends React.Component {
  getText (status) {
    switch (status) {
      case 'connecting':
        return 'Connecting'
      case 'connected':
        return 'Connected'
      case 'disconnected':
        return 'Disconnected'
      case 'error':
        return 'Connection Error'
    }
  }

  render () {
    return (
      <div className='status-text'>
        { this.getText(this.props.status) }
      </div>
    )
  }
}

StatusText.propTypes = {
  status: PropTypes.string
}
