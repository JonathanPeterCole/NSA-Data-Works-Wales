// React
import React from 'react'
import { render } from 'react-dom'
import App from './components/app'
import './style.css'

// React Router
import { Router } from 'react-router-dom'

import History from './history'

// Redux
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import sensors from './reducers/sensors'

const initialState = {
  sensors: { known: [], unknown: [], active: { identify: false, popup: false } }
}

const store = createStore(sensors, initialState)

// Saga

// import setupSocket from './sockets'
// const socket = setupSocket(store.dispatch, username)

// Render
render(
  <Provider store={store}>
    <Router history={History}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)
