import React from 'react'
import { Sensors } from '../containers/Sensors'
import { FullHistory } from '../containers/FullHistory'
import { Route, Redirect } from 'react-router-dom'

import Header from './header/header'

import './style.css'

export default class App extends React.Component {
  updateReadings () {

  }
  render () {
    return (
      <div>
        <Header />
        <div className='container'>
          <Redirect from='/' to='/arduinos' />
          <Route path='/arduinos' exact component={Sensors} />
          <Route path='/history/:id' exact component={FullHistory} />
        </div>
      </div>
    )
  }
}
