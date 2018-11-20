// React
import React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import './App.css'



// Redux
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import sensors from './reducers/sensors'

const initialState = { 
  sensors: { known: [], unknown: [], active: {identify: false, popup: false}}
};

const store = createStore(sensors, initialState)


// Saga

// import setupSocket from './sockets'
// const socket = setupSocket(store.dispatch, username)



// Render
render(
  <Provider store={store}>
    <App></App>
  </Provider>,
  document.getElementById('root')
)

