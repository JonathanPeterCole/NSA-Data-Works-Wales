import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import Arduinos from './pages/arduinos/arduinos'
import Learn from './pages/learn/learn'
import Header from './header/header'

import './style.css'

export default class App extends React.Component {
  updateReadings () {

  }
  render () {
    return (
      <div>
        <Header />
        <div className='content container'>
          <Route render={({ location }) => (
            <TransitionGroup>
              <CSSTransition
                key={location.key}
                classNames='router-animation'
                timeout={{ enter: 150, exit: 0 }}>
                <Switch location={location}>
                  <Redirect exact from='/' to='/arduinos' />
                  <Route path='/arduinos' exact component={Arduinos} />
                  <Route path='/learn' exact component={Learn} />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          )} />
        </div>
      </div>
    )
  }
}
