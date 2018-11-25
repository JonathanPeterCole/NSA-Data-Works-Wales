import React from 'react'
import PropTypes from 'prop-types'
import io from 'socket.io-client'

import { Loading } from '../Loading'
import { UnknownSensor } from '../../containers/UnknownSensor'
import { KnownSensor } from '../../containers/KnownSensor'
import { IdentifyPrompt } from '../../containers/IdentifyPrompt'
import { SensorPopup } from '../../containers/SensorPopup'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.updateSensor = this.updateSensor.bind(this)
    this.socket = io('/websocket')
    this.state = {
      loading: true,
      sensorpopup: false
    }
    this.socket.on('sensorReadings', (data) => {
      this.props.dispatch(data)
      this.setState({ loading: false })
      console.log(data)
    })
  }
  updateSensor (id, name) {
    this.socket.emit('updateSettings', {
      id: id,
      name: name
    })
  }
  showSensorPopup (sensorpopupinfo) {
    this.setState({ sensorpopup: !this.state.sensorpopup, sensorpopupinfo })
  }
  render () {
    return (
      this.state.loading
        ? <Loading />
        : <div>
          <div className='sensors'>
            <h1>Known sensors</h1>
            {this.props.sensors.known.map((data, i) => {
              return <KnownSensor key={i} data={data} />
            })}
          </div>
          <div className='sensors'>
            <h1>Unknown sensors</h1>
            {this.props.sensors.unknown.map((data, i) => {
              return <UnknownSensor key={i} data={data} />
            })}
          </div>
          {this.props.sensors.active.identify
            ? <IdentifyPrompt ref='prompt' updateSensor={this.updateSensor} /> : null
          }
          {this.props.sensors.active.popup
            ? <SensorPopup /> : null}

        </div>
    )
  }
}

App.propTypes = {
  dispatch: PropTypes.func,
  sensors: PropTypes.object
}
