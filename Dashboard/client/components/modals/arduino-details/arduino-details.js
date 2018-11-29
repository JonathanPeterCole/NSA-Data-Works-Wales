import React from 'react'
import PropTypes from 'prop-types'

import Modal from '../modal/modal'
import ModalHeader from '../modal/modal-header/modal-header'
import ModalContent from '../modal/modal-content/modal-content'

import './style.css'

export default class ArduinoDetails extends React.Component {
  render () {
    return (
      <Modal className='arduino-details' show={this.props.show} close={this.props.close}>
        <ModalHeader close={this.props.close}>
          <h1>Arduino Details</h1>
        </ModalHeader>
        <ModalContent>
          Detailed sensor readings will go here.
        </ModalContent>
      </Modal>
    )
  }
}

ArduinoDetails.propTypes = {
  show: PropTypes.bool,
  close: PropTypes.close
}
