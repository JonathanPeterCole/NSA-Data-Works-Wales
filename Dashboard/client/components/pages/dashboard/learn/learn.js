import React from 'react'

import HighlightArticle from './highlight-article/highlight-article'
import Article from './article/article'
import ArticleModal from '../../../modals/article-modal/article-modal'

import GuidesCollection from '../../../../guides/guides.json'

import './style.css'

export default class Learn extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      modalTitle: null,
      showModal: false
    };

    // Bindings
    this.showModal = this.showModal.bind(this)
    this.hideModal = this.hideModal.bind(this)
    this.getGuideFromURL = this.getGuideFromURL.bind(this)
  }

  getGuideFromURL (markdownURL) {
    fetch('/guides/' + markdownURL)
      .then((r) => r.text())
      .then(text => {
        this.setState({ modalMarkdown: text })
      });

    return 'Loading guide...'
  }

  showModal (modalTitle, markdownURL) {
    this.setState({
      modalTitle: modalTitle,
      modalMarkdown: this.getGuideFromURL(markdownURL),
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
          {
            GuidesCollection['top-guides'].map((guideData, i) => {
              return (
                <HighlightArticle
                  key={i}
                  title={guideData.title}
                  body={guideData.description}
                  image={"/guides/" + guideData.imgURL}
                  markdownURL={guideData.url}
                  clickFunc={this.showModal} />
              )
            })
          }
        </div>

        <h1>More Guides</h1>
        <div className='articles-container'>
          {
            GuidesCollection['guides'].map((guideData, i) => {
              return (
                <Article
                  key={i}
                  title={guideData.title}
                  body={guideData.description}
                  image={"/guides/" + guideData.imgURL}
                  markdownURL={guideData.url}
                  clickFunc={this.showModal} />
              )
            })
          }
        </div>
        <ArticleModal title={this.state.modalTitle} markdown={this.state.modalMarkdown} show={this.state.showModal} close={this.hideModal} />
      </div>
    )
  }
}
