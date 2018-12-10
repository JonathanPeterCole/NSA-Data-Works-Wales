
import React from 'react'
import './style.css'
import PropTypes from 'prop-types'

import TimeAgo from 'timeago.js'

import OfflineIcon from './img/notify-offline.svg'
import OnlineIcon from './img/notify-online.svg'
import ReadingIcon from './img/notify-reading.svg'

export default class NotificationFeed extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      notifications: [],
      previousOnlineStatuses: []
    }

    this.createNotification = this.createNotification.bind(this)
    this.createNotification(OfflineIcon, 'Fridge', 'Temperature', 'Sensor went offline', new Date())
    this.createNotification(OnlineIcon, 'Fridge', 'Temperature', 'Sensor came online', new Date())
    this.createNotification(ReadingIcon, 'Fridge', 'Temperature', 'Reading out of range (10°C)', new Date())

    this.closeNotificationFeed = this.closeNotificationFeed.bind(this) // Func must be bound before adding the handler
    document.addEventListener('click', this.closeNotificationFeed) // Add document click event to close the NotificationFeed component when clicking outside it
    this.notificationFeed = React.createRef()
  }

  // Remove document click event that closes the feed when the NotificationFeed component is removed
  componentWillUnmount () {
    document.removeEventListener('click', this.closeNotificationFeed)
  }

  // Function to generate new notification object and push it to state
  createNotification (icon, projectName, sensorName, text, date) {
    let notificationsCount = this.state.notifications.length
    let notificationId = 1

    if (notificationsCount !== 0) {
      notificationId = this.state.notifications[notificationsCount - 1].id + 1
    }

    this.setState({
      notifications: this.state.notifications.push({
        id: notificationId,
        icon: icon,
        title: projectName + '/' + sensorName + ': ',
        text: text,
        date: date
      })
    })
  }

  closeNotificationFeed (e) {
    if (!this.notificationFeed.current.contains(e.target)) {
      this.props.close()
    }
  }

  componentDidUpdate () {
    for (let arduino in this.props.arduinos) {
      for (let sensor in arduino.sensors) {
        if (this.state.previousOnlineStatuses[arduino.id] == null) {
          this.state.previousOnlineStatuses[arduino.id] = {}
        }

        let sensorLastOnline = this.state.previousOnlineStatuses[arduino.id][sensor.id]
        if (sensorLastOnline == null) {
          this.state.previousOnlineStatuses[arduino.id][sensor.id] = sensor.online
        } else if (sensor.online !== sensorLastOnline) {
          if (sensor.online && !sensorLastOnline) {
            this.createNotification(OnlineIcon, arduino.name, sensor.name, 'Sensor came online', new Date())
          } else {
            this.createNotification(OfflineIcon, arduino.name, sensor.name, 'Sensor went offline', new Date())
          }

          this.state.previousOnlineStatuses[arduino.id][sensor.id] = sensor.online // Update previousOnlineStatuses with change
        }
      }
    }
  }

  render () {
    return (
      <div ref={this.notificationFeed} id='feedWrapper'>
        <div id='notificationsContainer'>
          <span id='feedTitle'>Notifications</span>
          {
            this.state.notifications.map((notification) => {
              return (
                <div key={notification.id} className='notification'>
                  <img className='notificationIcon' src={notification.icon} />
                  <span>{notification.title}</span>
                  <br />
                  <span>{notification.text}</span>
                  <span className='notificationDate'>{TimeAgo().format(notification.date)}</span>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

NotificationFeed.propTypes = {
  close: PropTypes.func,
  arduinos: PropTypes.array
}
