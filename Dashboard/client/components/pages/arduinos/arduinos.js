import React from 'react'

import Arduino from './arduino/arduino'
import Modal from '../../modal/modal'

import './style.css'

export default class Arduinos extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      arduinos: {}
    }
    // Bindings
    this.showModal = this.showModal.bind(this)
    this.hideModal = this.hideModal.bind(this)
  }
  showModal () {
    this.setState({
      showModal: true
    })
  }
  hideModal () {
    this.setState({
      showModal: false
    })
  }
  render () {
    return (
      <div className='arduinos'>
        <h1>Your Arduino's</h1>
        <div className='arduinos-container'>
          <Arduino colour='blue' onClick={this.showModal} />
          <Arduino colour='green' onClick={this.showModal} />
          <Arduino colour='orange' onClick={this.showModal} />
          <Arduino colour='red' onClick={this.showModal} />
        </div>
        <Modal show={this.state.showModal} close={this.hideModal} />
      </div>
    )
  }
}
