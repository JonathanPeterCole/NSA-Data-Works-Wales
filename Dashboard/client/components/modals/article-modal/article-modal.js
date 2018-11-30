import React from 'react'
import PropTypes from 'prop-types'

import Modal from '../modal/modal'
import ModalHeader from '../modal/modal-header/modal-header'
import ModalContent from '../modal/modal-content/modal-content'

import './style.css'

export default class ArticleModal extends React.Component {
  render () {
    return (
      <Modal className='read-article' show={this.props.show} close={this.props.close}>
        <ModalHeader close={this.props.close}>
          <h1>Article Title</h1>
        </ModalHeader>
        <ModalContent>
          Instructions will go here.
        </ModalContent>
      </Modal>
    )
  }
}

ArticleModal.propTypes = {
  show: PropTypes.bool,
  close: PropTypes.func
}
