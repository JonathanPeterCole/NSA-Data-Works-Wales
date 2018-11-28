import React from 'react'

import SearchBar from './searchbar/searchbar'
import NavBar from './navbar/navbar'
import IconButton from '../buttons/icon-button/icon-button'

import './style.css'

import Logo from './img/logo.svg'
import SettingsIcon from './img/settings.svg'

export default class Header extends React.Component {
  render () {
    return (
      <div className='header'>
        <div className='container'>
          <div className='row top'>
            <a className='logo' href='/' alt='Data Works Wales'>
              <img src={Logo} />
            </a>
            <div className='actions'>
              <IconButton image={SettingsIcon} hover='rotate' />
            </div>
          </div>
          <div className='row bottom'>
            <NavBar />
            <SearchBar />
          </div>
        </div>
      </div>
    )
  }
}
