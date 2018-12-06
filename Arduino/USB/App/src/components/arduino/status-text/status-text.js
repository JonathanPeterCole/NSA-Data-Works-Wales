import React from 'react'
import PropTypes from 'prop-types'

export default class StatusText extends React.Component {
  render () {
    return (
      <div className='status-text'>
        { this.props.status === 'connecting' && <span>Connecting</span> }
        { this.props.status === 'connected' && <span>Connected</span> }
        { this.props.status === 'disconnected' && <span>Disconnected</span> }
        { this.props.status === 'error' && <span>Something Went Wrong</span> }
      </div>
    )
  }
}

StatusText.propTypes = {
  status: PropTypes.string
}
