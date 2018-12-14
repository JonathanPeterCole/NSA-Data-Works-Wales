import React from 'react'

import SearchBar from './searchbar/searchbar'
import NavBar from './navbar/navbar'
import IconButton from '../buttons/icon-button/icon-button'

import SettingsModal from '../modals/settings-modal/settings-modal'

import BellIcon from './img/bell.svg'
import { NotificationsFeed } from './notification-feed/notification-feed-container'

import './style.css'

import Logo from './img/logo.svg'
import SettingsIcon from './img/settings.svg'

export default class Header extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showNotifications: false,
      showSettings: false
    }

    // Bindings
    this.toggleNotificationsFeed = this.toggleNotificationsFeed.bind(this)
    this.showSettings = this.showSettings.bind(this)
    this.hideSettings = this.hideSettings.bind(this)
    this.hideNotificationFeed = this.hideNotificationFeed.bind(this)
  }

  toggleNotificationsFeed () {
    this.setState({
      showNotifications: !this.state.showNotifications
    })
  }
  showSettings () {
    this.setState({
      showSettings: true
    })
  }
  hideSettings () {
    this.setState({
      showSettings: false
    })
  }

  hideNotificationFeed () {
    this.setState({
      showNotifications: false
    })
  }

  render () {
    return (
      <div className='header'>
        <div className='container'>
          <div className='row top'>
            <a className='logo' href='/' alt='Data Works Wales'>
              <img src={Logo} />
            </a>
            <div className='actions'>
              <IconButton image={BellIcon} hover='bell' onClick={this.toggleNotificationsFeed} />
              <IconButton image={SettingsIcon} hover='rotate' onClick={this.showSettings} />
              {
                this.state.showNotifications ? <NotificationsFeed close={this.hideNotificationFeed} /> : null
              }

            </div>
          </div>
          <div className='row bottom'>
            <NavBar />
            <SearchBar />
          </div>
        </div>
        <SettingsModal show={this.state.showSettings} close={this.hideSettings} />
      </div>
    )
  }
}
