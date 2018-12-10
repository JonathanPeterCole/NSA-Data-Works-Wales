import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

import Dashboard from './pages/dashboard/dashboard'
import Login from './pages/login/login'

export default class App extends React.Component {
  loggedIn () {
    if (localStorage.getItem('jwt')) {
      return true
    } else {
      return false
    }
  }
  render () {
    return (
      <div>
        <Route render={({ location }) => (
          <Switch location={location}>
            {this.loggedIn()
              ? <Redirect exact from='/' to='/dashboard/arduinos' />
              : <Redirect exact from='/' to='/login' />
            }
            <Route path='/login' component={Login} />
            <Route path='/dashboard' component={Dashboard} />
          </Switch>
        )} />
      </div>
    )
  }
}
