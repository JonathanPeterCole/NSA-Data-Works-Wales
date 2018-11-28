import React from 'react'
import PropTypes from 'prop-types'

import './style.css'

export default class IconButton extends React.Component {
  constructor (props) {
    super(props)

    // Bindings
    this.getHoverEffect = this.getHoverEffect.bind(this)
  }

  getHoverEffect () {
    console.log(this.props.hover)
    switch (this.props.hover) {
      case 'rotate':
        return 'icon-button rotate'
      default:
        return 'icon-button'
    }
  }

  render () {
    return (
      <a className={this.getHoverEffect()}>
        <img src={this.props.image} />
      </a>
    )
  }
}

IconButton.propTypes = {
  image: PropTypes.string,
  hover: PropTypes.string
}
