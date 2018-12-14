import React from 'react'
import PropTypes from 'prop-types'

import Modal from '../modal/modal'
import ModalHeader from '../modal/modal-header/modal-header'
import ModalContent from '../modal/modal-content/modal-content'

import './style.css'

export default class SettingsModal extends React.Component {
  render () {
    return (
      <Modal className='settings' show={this.props.show} close={this.props.close}>
        <ModalHeader close={this.props.close}>
          <h1>Settings</h1>
        </ModalHeader>
        <ModalContent>
          <div>Settings will go here.</div>
        </ModalContent>
      </Modal>
    )
  }
}

SettingsModal.propTypes = {
  show: PropTypes.bool,
  close: PropTypes.func
}
