import React from 'react'

import './style.css'

import SearchIcon from './img/search.svg'

export default class SearchBar extends React.Component {
  render () {
    return (
      <div className='searchbar'>
        <input className='search' type='text' placeholder='Search' />
        <img className='icon' src={SearchIcon} />
      </div>
    )
  }
}
