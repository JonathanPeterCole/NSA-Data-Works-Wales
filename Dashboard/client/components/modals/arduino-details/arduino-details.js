import React from 'react'

import ModalHeader from '../modal/modal-header/modal-header'
import ModalContent from '../modal/modal-content/modal-content'

import './style.css'

export default class ArduinoDetails extends React.Component {
  render () {
    return (
      <div className='arduino-details-modal'>
        <ModalHeader>
          <h1>Arduino Details</h1>
        </ModalHeader>
        <ModalContent>
          Detailed sensor readings will go here.<br />
        </ModalContent>
      </div>
    )
  }
}
