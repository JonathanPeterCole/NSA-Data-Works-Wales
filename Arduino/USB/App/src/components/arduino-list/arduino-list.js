import React from 'react'
import PropTypes from 'prop-types'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

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
          <TransitionGroup className='arduino-container'>
            {this.props.arduinos.map((arduino, key) => (
              <CSSTransition
                key={key}
                timeout={300}
                classNames='arduino-transition'
                unmountOnExit>
                <Arduino key={key} arduino={arduino} disconnected={this.props.disconnected} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
      </div>
    )
  }
}

ArduinoList.propTypes = {
  arduinos: PropTypes.array,
  disconnected: PropTypes.func
}
