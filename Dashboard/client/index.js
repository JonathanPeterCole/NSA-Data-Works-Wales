// React
import React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import './App.css'

// Redux
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import sensors from './reducers/sensors'
const store = createStore(sensors)


// Render
render(
  <Provider store={store}>
    <App></App>
  </Provider>,
  document.getElementById('root')
)

