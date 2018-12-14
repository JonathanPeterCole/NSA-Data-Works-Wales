import React from 'react'
import PropTypes from 'prop-types'
import { remote } from 'electron'

import './style.css'

export default class titlebar extends React.Component {
  constructor (props) {
    super(props)
    // Get the current window
    this.window = remote.getCurrentWindow()
    // Set the initial state
    this.state = {
      isMaximized: this.window.isMaximized()
    }
    // Listen for maximise event
    this.window.on('maximize', () => {
      this.setState({ isMaximized: true })
    })
    // Listen for unmaximise event
    this.window.on('unmaximize', () => {
      this.setState({ isMaximized: false })
    })
    // Bindings
    this.close = this.close.bind(this)
    this.resize = this.resize.bind(this)
    this.minimise = this.minimise.bind(this)
  }

  close () {
    this.window.close()
  }

  resize () {
    if (this.state.isMaximized) {
      this.window.unmaximize()
      this.setState({ isMaximized: false })
    } else {
      this.window.maximize()
      this.setState({ isMaximized: true })
    }
  }

  minimise () {
    this.window.minimize()
  }

  render () {
    return (
      <div className='titlebar'>
        {this.props.icon &&
          <img className='titlebar-icon' src={this.props.icon} />
        }
        <div className='titlebar-text'>
          { this.props.title }
        </div>
        <div className='titlebar-controls'>
          <div className='titlebar-btn minimize'onClick={this.minimise}>
            <svg x='0px' y='0px' viewBox='0 0 10 1'>
              <rect fill='#FFFFFF' width='10' height='1' />
            </svg>
          </div>
          <div className='titlebar-btn resize'onClick={this.resize}>
            { this.state.isMaximized === true &&
              <svg x='0px' y='0px' viewBox='0 0 10 10'>
                <mask id='Mask'>
                  <rect fill='#FFFFFF' width='10' height='10' />
                  <path fill='#000000' d='M3,1h6v6H8V2H3V1z' />
                  <path fill='#000000' d='M1,3h6v6H1V3z' />
                </mask>
                <path fill='#FFFFFF' d='M2,0h8v8H8v2H0V2h2V0z' mask='url(#Mask)' />
              </svg>
            }
            { this.state.isMaximized === false &&
              <svg x='0px' y='0px' viewBox='0 0 10 10'>
                <path fill='#FFFFFF' d='M0,0v10h10V0H0z M1,1h8v8H1V1z' />
              </svg>
            }
          </div>
          <div className='titlebar-btn close' onClick={this.close}>
            <svg x='0px' y='0px' viewBox='0 0 10 10'>
              <polygon fill='#FFFFFF' points='10,0.9 9.1,0 5,4.1 0.9,0 0,0.9 4.1,5 0,9.1 0.9,10 5,5.9 9.1,10 10,9.1 5.9,5' />
            </svg>
          </div>
        </div>
      </div>
    )
  }
}

titlebar.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string
}
