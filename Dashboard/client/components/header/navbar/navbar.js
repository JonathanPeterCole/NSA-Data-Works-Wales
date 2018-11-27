import React from 'react'

import './style.css'

import ArduinosIcon from './img/arduinos.svg'
import LearnIcon from './img/learn.svg'

export default class NavBar extends React.Component {
  render () {
    return (
      <div className='navbar'>
        <a className='btn arduinos active' href='/arduinos'>
          <img className='icon' src={ArduinosIcon} />
          <span className='label'>Your Arduino's</span>
        </a>
        <a className='btn learn' href='/learn'>
          <img className='icon' src={LearnIcon} />
          Learn and Build
        </a>
      </div>
    )
  }
}
