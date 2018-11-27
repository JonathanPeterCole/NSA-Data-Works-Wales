import React from 'react'

export default class Arduinos extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      arduinos: {}
    }
  }
  render () {
    return (
      <div className='arduinos'>
        Arduinos will appear here
      </div>
    )
  }
}
