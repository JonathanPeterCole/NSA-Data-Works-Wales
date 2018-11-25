import React from 'react'
import PropTypes from 'prop-types'

export default class IdentifyPrompt extends React.Component {
  constructor (props) {
    super(props)
    document.addEventListener('click', (e) => {
      if (e.target.className === 'identify-prompt-wrapper') {
        this.props.dispatch({ identify: false })
      }
    })
  }
  render () {
    return (
      <div className='identify-prompt-wrapper'>
        <div className='identify-prompt'>
          <div onClick={() => this.props.dispatch({ identify: false })} className='close' />
          <h1>Sensor Details</h1>
          <div className='input'>
            <h1>Sensor ID</h1>
            <input type='text' disabled value={this.props.data.id} />
          </div>
          <div className='input'>
            <h1>Sensor Name</h1>
            <input type='text' defaultValue={this.props.data.name ? this.props.data.name : 'unidentified'} onChange={e => this.setState({ name: e.target.value })} onKeyPress={(e) => {
              if (e.key === 'Enter') {
                this.props.updateSensor(this.props.data.id, this.state.name)
                this.props.dispatch({ identify: false })
              }
            }} />
          </div>
          <button onClick={() => {
            this.props.updateSensor(this.props.data.id, this.state.name)
            this.props.dispatch({ identify: false })
          }}>Save</button>
        </div>
      </div>
    )
  }
}

IdentifyPrompt.propTypes = {
  dispatch: PropTypes.func,
  data: PropTypes.object,
  updateSensor: PropTypes.func
}
