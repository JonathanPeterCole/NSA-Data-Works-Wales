// React
import React from 'react'
import { render } from 'react-dom'
import App from './components/app'
import './style.css'

// React Router
import { Router } from 'react-router-dom'

import history from './history'

// Redux
import { Provider } from 'react-redux'
import { createStore } from 'redux'
// import sensors from './reducers/sensors'
import test from './reducers/test'

// Client socket API
import API from './api.js'

const store = createStore(test)

API.setSocket() // Initialise socket
API.setDispatch(store.dispatch)
// Saga

// import setupSocket from './sockets'
// const socket = setupSocket(store.dispatch, username)

// Render
render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)
