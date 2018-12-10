import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

import './style.css'

import history from '../../../History'

export default class Login extends React.Component {
  constructor (props) {
    super(props)
    this.props.showHeader(false)
    this.username = React.createRef()
    this.password = React.createRef()
    this.login = this.login.bind(this)
  }
  login () {
    axios.post('/api/login', { username: this.username.current.value, password: this.password.current.value }).then(r => {
      if (r.data.status === 'Success') {
        localStorage.setItem('jwt', r.data.token)
        history.push('/arduinos')
      }
    })
  }
  render () {
    return (
      <div className='login'>
        <form>
          <h1>Login</h1>
          <div className='input'>
            <h1>Username</h1>
            <input ref={this.username} type='text' />
          </div>
          <div className='input'>
            <h1>Password</h1>
            <input ref={this.password} type='password' />
          </div>
          <div className='input'>
            <input type='button' value='login' onClick={this.login} />
          </div>
        </form>
      </div>
    )
  }
}

Login.propTypes = {
  showHeader: PropTypes.func
}
