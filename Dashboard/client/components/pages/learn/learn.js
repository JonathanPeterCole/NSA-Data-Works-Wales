import React from 'react'

import HighlightArticle from './highlight-article/highlight-article'
import Article from './article/article'

import ImgArticle1 from './img/1.png'
import ImgArticle2 from './img/2.png'
import ImgArticle3 from './img/3.png'
import ImgArticle4 from './img/4.png'
import ImgArticle5 from './img/5.png'

import './style.css'

export default class Learn extends React.Component {
  render () {
    return (
      <div className='learn'>
        <h1>Top Guides</h1>
        <div className='highlight-container'>
          <HighlightArticle
            title='Building Your First Arduino'
            body='Get started with this quick and easy quide to setup an Arduino with a simple button.'
            image={ImgArticle1} />
          <HighlightArticle
            title='Connecting an Arduino to Data Works'
            body='Learn how to connect an Arduino to Data Works to see sensor readings live online.'
            image={ImgArticle2} />
        </div>
        <h1>More Guides</h1>
        <div className='articles-container'>
          <Article
            title='Setting up a Temperature Sensor'
            body='Measure the temperature using an Arduino by setting up a temperature sensor.'
            image={ImgArticle3} />
          <Article
            title='Setting up a Moisture Sensor'
            body='Monitor how much moisture is in the air with a moisture sensor.'
            image={ImgArticle4} />
          <Article
            title='Setting up a Light Sensor'
            body='Follow this guide to setup a light sensor on an Arduino.'
            image={ImgArticle5} />
        </div>
      </div>
    )
  }
}
