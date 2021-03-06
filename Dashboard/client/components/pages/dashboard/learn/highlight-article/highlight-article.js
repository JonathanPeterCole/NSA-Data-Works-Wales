import React from 'react'
import PropTypes from 'prop-types'

import './style.css'

export default class HighlightArticle extends React.Component {
  render () {
    return (
      <div className='highlight-article'>
        <div className='box' onClick={() => { this.props.clickFunc(this.props.title, this.props.markdownURL) }}>
          <img src={this.props.image} />
          <div className='title'>{this.props.title}</div>
          <div className='body'>{this.props.body}</div>
        </div>
      </div>
    )
  }
}

HighlightArticle.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  body: PropTypes.string,
  markdownURL: PropTypes.string,
  clickFunc: PropTypes.func
}
