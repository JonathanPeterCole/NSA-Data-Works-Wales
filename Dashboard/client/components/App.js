import React from 'react'
import { Route, Redirect, Switch, Router } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import Arduinos from './pages/arduinos/arduinos'
import Learn from './pages/learn/learn'
import Login from './pages/login/login'
import Header from './header/header'

import History from '../History'

import './style.css'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showHeader: true
    }
    this.showHeader = this.showHeader.bind(this)
  }
  updateReadings () {

  }
  loggedIn () {
    if (localStorage.getItem('jwt')) {
      return true
    } else {
      return false
    }
  }
  showHeader (show = true) {
    this.setState({ showHeader: show })
  }
  render () {
    return (
      <div>
        {this.state.showHeader ? <Header /> : null}
        <div className='content container'>
          <Router history={History}>
            <Route render={({ location }) => (
              <TransitionGroup>
                <CSSTransition
                  key={location.key}
                  classNames='router-animation'
                  timeout={{ enter: 150, exit: 0 }}>
                  <Switch location={location}>
                    {this.loggedIn()
                      ? <Redirect exact from='/' to='/arduinos' />
                      : <Redirect exact from='/' to='/login' />
                    }
                    <Route path='/arduinos' exact render={(p) => <Arduinos {...p} showHeader={this.showHeader} />} /> {/* must be a better wa to do this but cba */}
                    <Route path='/login' exact render={(p) => <Login {...p} showHeader={this.showHeader} />} />
                    <Route path='/learn' exact component={Learn} />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            )} />
          </Router>
        </div>
      </div>
    )
  }
}
