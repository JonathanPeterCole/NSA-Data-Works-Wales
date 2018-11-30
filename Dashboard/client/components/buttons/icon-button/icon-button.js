import React from 'react'
import PropTypes from 'prop-types'

import './style.css'

export default class IconButton extends React.Component {
  constructor (props) {
    super(props)

    // Bindings
    this.getClassName = this.getClassName.bind(this)
  }

  getClassName () {
    let className = 'icon-button'
    if (this.props.hover) className += ' ' + this.props.hover
    if (this.props.className) className += ' ' + this.props.className
    return className
  }

  render () {
    return (
      <button className={this.getClassName()} onClick={this.props.onClick}>
        <img src={this.props.image} />
      </button>
    )
  }
}

IconButton.propTypes = {
  className: PropTypes.string,
  image: PropTypes.string,
  hover: PropTypes.string,
  onClick: PropTypes.func
}
