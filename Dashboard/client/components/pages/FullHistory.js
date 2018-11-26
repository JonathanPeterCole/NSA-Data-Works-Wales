import React from 'react'
import PropTypes from 'prop-types'
import SensorHistory from '../sensor/SensorHistory'
import axios from 'axios'
import history from '../../History'

import { Loading } from '../Loading'

export default class FullHistory extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true
    }
  }
  componentDidMount () {
    console.log('mounted')
    let sensorid = this.props.location.pathname.split('/')[2]
    axios.get('/api/history/' + sensorid).then(res => {
      console.log(res)
      this.setState({ loading: false, data: res.data.sensors })
    })
  }
  render () {
    return (
      <div className='full-history'>
        {this.state.loading
          ? <Loading />
          : (

            <div>
              <button className='basic' onClick={() => { history.push('/') }}>Go back</button>
              <SensorHistory data={this.state.data} />
            </div>
          )}
      </div>
    )
  }
}

FullHistory.propTypes = {
  location: PropTypes.object
}
