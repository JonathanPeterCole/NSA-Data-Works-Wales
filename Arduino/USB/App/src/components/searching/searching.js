import React from 'react'

import './style.css'

export default class Searching extends React.Component {
  render () {
    return (
      <div className='searching'>
        <svg className='animated-arduino' viewBox='0 0 720 340'>
          <rect className='minus' x='126.7' y='147.7' width='106.8' height='34.7' />
          <polygon className='plus' points='552.6,214.5 518.8,214.5 518.8,181.8 486.3,181.8 486.3,148.1 518.8,148.1 518.8,115.6 552.6,115.6
            552.6,148.1 585.1,148.1 585.1,181.8 552.6,181.8 ' />
          <path className='infinity' d='M175.3,30C95.1,30,30,92.6,30,169.9s65.1,139.9,145.3,139.9C365,319.7,345,30,544.7,30
            C624.9,30,690,92.6,690,169.9s-65.1,139.9-145.3,139.9C355,319.7,375,30,175.3,30' />
          <path className='infinity-overlay' d='M175.3,30C95.1,30,30,92.6,30,169.9s65.1,139.9,145.3,139.9C365,319.7,345,30,544.7,30
            C624.9,30,690,92.6,690,169.9s-65.1,139.9-145.3,139.9C355,319.7,375,30,175.3,30' />
        </svg>
        <div className='text'>Looking for Arduino's</div>
      </div>
    )
  }
}
