import React from 'react'
import PropTypes from 'prop-types'

import Arduino from '../arduino/arduino'

import './style.css'

export default class ArduinoList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showFader: false
    }
    this.onScroll = this.onScroll.bind(this)
  }
  onScroll (event) {
    console.log(event.target.scrollTop)
    if (event.target.scrollTop === 0) {
      this.setState({ showFader: false })
    } else {
      this.setState({ showFader: true })
    }
  }
  render () {
    return (
      <div className='arduino-list'>
        <div className={this.state.showFader ? 'scroll-fader show' : 'scroll-fader'} />
        <div className='scroll-area' onScroll={this.onScroll}>
          <div className='arduino-container'>
            {this.props.arduinos.map((arduino, key) => (
              <Arduino key={key} arduino={arduino} />
            ))}
          </div>
        </div>
      </div>
    )
  }
}

ArduinoList.propTypes = {
  arduinos: PropTypes.array
}
