import React from 'react'

import './style.css'

export default class Spinner extends React.Component {
  render () {
    return (
      <div className='spinner'>
        <svg className='circle' viewBox='0 0 50 50'>
          <circle className='path' cx='25' cy='25' r='20' fill='none' />
        </svg>
      </div>
    )
  }
}
