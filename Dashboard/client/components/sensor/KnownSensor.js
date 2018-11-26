import React from 'react'
import PropTypes from 'prop-types'

import Temperature from './formats/Temperature'

export default class KnownSensor extends React.Component {
  constructor (props) {
    super(props)
    this.onClick = this.onClick.bind(this)
    this.options = {
      build: ['withBackground', 'withLine', 'withSideShade', 'withInfo', 'withActive'],
      padding: { top: 8, bottom: 8, right: 0, left: 0 },
      fontsize: 14,
      name: props.data.name,
      active: true
    }
  }
  onClick () {
    this.props.dispatch({ ...this.props.data, popup: true })
  }
  render () {
    return (
      <div className='sensor' >
        <div className='data'>
          {/* <div className="header">
                        <h1 onClick={() => {

                        this.props.dispatch({id: this.props.data.id, popup: true})
                        }}>{this.props.data.name}</h1>
                    </div> */}
          <Temperature options={this.options}
            height='80'
            data={this.props.data}
            onClick={this.onClick} />
          <button onClick={() => {
            this.props.dispatch({ ...this.props.data, identify: true })
          }}>Edit</button>
        </div>
      </div>
    )
  }
}

KnownSensor.propTypes = {
  dispatch: PropTypes.func,
  data: PropTypes.object
}
