import React from 'react'
import PropTypes from 'prop-types'

import Spinner from '../../spinner/spinner'

export default class StatusIndicator extends React.Component {
  render () {
    return (
      <div className='status-indicator'>
        { this.props.status === 'connecting' &&
          <Spinner />
        }
      </div>
    )
  }
}

StatusIndicator.propTypes = {
  status: PropTypes.string
}
