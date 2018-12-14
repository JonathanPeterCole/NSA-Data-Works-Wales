import React from 'react'
import axios from 'axios'

import './style.css'

import history from '../../../history'

export default class Login extends React.Component {
  constructor (props) {
    super(props)
    this.username = React.createRef()
    this.password = React.createRef()

    // Bind functions
    this.login = this.login.bind(this)
    this.register = this.register.bind(this)
    this.setFeedback = this.setFeedback.bind(this)

    this.state = {
      feedbackMsg: null,
      feedbackClass: null
    }
  }
  login () {
    axios.post('/api/login', { username: this.username.current.value, password: this.password.current.value }).then(r => {
      if (r.data.status === 'Success') {
        localStorage.setItem('jwt', r.data.token)
        history.push('/dashboard/arduinos')
      } else {
        this.setFeedback(r.data.message, true)
      }
    })
  }
  register () {
    axios.post('/api/register', { username: this.username.current.value, password: this.password.current.value }).then(r => {
      if (r.data.status === 'Success') {
        this.setFeedback(r.data.message, false)
      } else {
        this.setFeedback(r.data.message, true)
      }
    })
  }

  setFeedback (message, isError) {
    let prefix = isError ? 'Error: ' : ''

    this.setState({
      feedbackMsg: prefix + message,
      feedbackClass: isError ? 'feedbackError' : 'feedbackSuccess'
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
          {
            this.state.feedbackMsg ? <span id='serverFeedback' className={this.state.feedbackClass}>{this.state.feedbackMsg}</span> : null
          }
          <div className='input submitButtons'>
            <input type='button' value='Login' onClick={this.login} />
            <input type='button' value='Register' onClick={this.register} />
          </div>
        </form>
      </div>
    )
  }
}
