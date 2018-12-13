import React from 'react'
import PropTypes from 'prop-types'

import './style.css'

export default class Article extends React.Component {
  render () {
    return (
      <div className='article'>
        <div className='box' onClick={() => { this.props.clickFunc(this.props.title, this.props.markdownURL) }}>
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
  body: PropTypes.string,
  markdownURL: PropTypes.string,
  clickFunc: PropTypes.func
}
