import React from 'react'

import Arduino from './arduino/arduino'

import './style.css'

export default class Arduinos extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      arduinos: {}
    }
  }
  render () {
    return (
      <div className='arduinos'>
        <h1>Your Arduino's</h1>
        <div className='arduinos-container'>
          <Arduino colour='blue' />
          <Arduino colour='green' />
          <Arduino colour='orange' />
          <Arduino colour='red' />
        </div>
      </div>
    )
  }
}
