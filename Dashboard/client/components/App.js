import React from 'react'
import { Sensors } from '../containers/Sensors'
import { FullHistory } from '../containers/FullHistory'
import { Route } from 'react-router-dom'

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
          <Route path='/' exact component={Sensors} />
          <Route path='/history/:id' exact component={FullHistory} />
        </div>
      </div>
    )
  }
}
