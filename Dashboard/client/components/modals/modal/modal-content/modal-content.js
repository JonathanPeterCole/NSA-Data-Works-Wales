import React from 'react'
import PropTypes from 'prop-types'

import './style.css'

export default class ModalContent extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      showFader: false
    }
    this.onScroll = this.onScroll.bind(this)
  }
  onScroll (event) {
    console.log(event.target.scrollTop)
    if (event.target.scrollTop === 0) {
      this.setState({ showFader: false })
    } else {
      this.setState({ showFader: true })
    }
  }
  render () {
    return (
      <div className='modal-content'>
        <div className={this.state.showFader ? 'scroll-fader show' : 'scroll-fader'} />
        <div className='scroll-area' onScroll={this.onScroll}>
          <div className='modal-content-container'>
            {this.props.children}
            {/* {this.props.children.map((c) => {
              console.log(c)
              return (
                <div></div>
              )
            })} */}
          </div>
        </div>
      </div>
    )
  }
}
ModalContent.propTypes = {
  children: PropTypes.node
}
