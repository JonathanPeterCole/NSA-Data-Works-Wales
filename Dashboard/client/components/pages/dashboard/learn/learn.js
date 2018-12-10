import React from 'react'

import HighlightArticle from './highlight-article/highlight-article'
import Article from './article/article'
import ArticleModal from '../../../modals/article-modal/article-modal'

import ImgArticle1 from './img/1.png'
import ImgArticle2 from './img/2.png'
import ImgArticle3 from './img/3.png'
import ImgArticle4 from './img/4.png'
import ImgArticle5 from './img/5.png'

import './style.css'

export default class Learn extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showModal: false
    }
    // Bindings
    this.showModal = this.showModal.bind(this)
    this.hideModal = this.hideModal.bind(this)
  }
  showModal () {
    this.setState({
      showModal: true
    })
  }
  hideModal () {
    this.setState({
      showModal: false
    })
  }
  render () {
    return (
      <div className='learn'>
        <h1>Top Guides</h1>
        <div className='highlight-container'>
          <HighlightArticle
            title='Building Your First Arduino'
            body='Get started with this quick and easy quide to setup an Arduino with a simple button.'
            image={ImgArticle1}
            onClick={this.showModal} />
          <HighlightArticle
            title='Connecting an Arduino to Data Works'
            body='Learn how to connect an Arduino to Data Works to see sensor readings live online.'
            image={ImgArticle2}
            onClick={this.showModal} />
        </div>
        <h1>More Guides</h1>
        <div className='articles-container'>
          <Article
            title='Setting up a Temperature Sensor'
            body='Measure the temperature using an Arduino by setting up a temperature sensor.'
            image={ImgArticle3}
            onClick={this.showModal} />
          <Article
            title='Setting up a Moisture Sensor'
            body='Monitor how much moisture is in the air with a moisture sensor.'
            image={ImgArticle4}
            onClick={this.showModal} />
          <Article
            title='Setting up a Light Sensor'
            body='Follow this guide to setup a light sensor on an Arduino.'
            image={ImgArticle5}
            onClick={this.showModal} />
        </div>
        <ArticleModal show={this.state.showModal} close={this.hideModal} />
      </div>
    )
  }
}
