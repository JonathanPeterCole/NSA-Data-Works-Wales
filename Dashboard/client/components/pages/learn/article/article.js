import React from 'react'
import PropTypes from 'prop-types'

import './style.css'

export default class Article extends React.Component {
  render () {
    return (
      <div className='article'>
        <div className='box'>
          <img src={this.props.image} />
          <div className='info'>
            <div className='title'>{this.props.title}</div>
            <div className='body'>{this.props.body}</div>
          </div>
        </div>
      </div>
    )
  }
}

Article.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  body: PropTypes.string
}
