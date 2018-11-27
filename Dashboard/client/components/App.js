import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
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
          <Switch>
            <Redirect exact from='/' to='/arduinos' />
            <Route path='/arduinos' exact component={Arduinos} />
            <Route path='/learn' exact component={Learn} />
          </Switch>
        </div>
      </div>
    )
  }
}
