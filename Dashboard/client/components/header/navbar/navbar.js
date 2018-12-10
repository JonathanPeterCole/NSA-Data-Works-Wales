import React from 'react'
import { NavLink } from 'react-router-dom'

import './style.css'

import ArduinosIcon from './img/arduinos.svg'
import LearnIcon from './img/learn.svg'

export default class NavBar extends React.Component {
  render () {
    return (
      <div className='navbar'>
        <NavLink to={'/dashboard/arduinos'} className='btn arduinos'>
          <img className='icon' src={ArduinosIcon} />
          <span className='label'>Your Arduino's</span>
        </NavLink>
        <NavLink to={'/dashboard/learn'} className='btn learn'>
          <img className='icon' src={LearnIcon} />
          <span className='label'>Learn and Build</span>
        </NavLink>
      </div>
    )
  }
}
