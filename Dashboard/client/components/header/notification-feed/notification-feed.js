import React from 'react'
import './style.css'
import PropTypes from 'prop-types'

import OfflineIcon from './img/notify-offline.svg'
import OnlineIcon from './img/notify-online.svg'
import ReadingIcon from './img/notify-reading.svg'

export default class NotificationFeed extends React.Component {
  constructor(props)
  {
    super(props)

    this.state = {
      notifications: [
        {
          id: 1,
          icon: OfflineIcon,
          text: 'Sensor went offline',
          dateString: '10 seconds ago'
        },
        {
          id: 2,
          icon: OnlineIcon,
          text: 'Sensor came online',
          dateString: 'Now'
        },
        {
          id: 3,
          icon: ReadingIcon,
          text: 'Temp1 is 10°C',
          dateString: 'Now'
        },
        {
          id: 4,
          icon: ReadingIcon,
          text: 'Temp1 is 10°C',
          dateString: 'Now'
        },
        {
          id: 5,
          icon: ReadingIcon,
          text: 'Temp1 is 10°C',
          dateString: 'Now'
        },
        {
          id: 6,
          icon: ReadingIcon,
          text: 'Temp1 is 10°C',
          dateString: 'Now'
        },
        {
          id: 7,
          icon: ReadingIcon,
          text: 'Temp1 is 10°C',
          dateString: 'Now'
        },
        {
          id: 8,
          icon: ReadingIcon,
          text: 'Temp1 is 10°C',
          dateString: 'Now'
        }
      ]
    }
  }

  render () {
    if (this.props.shouldShow) {
      return (
        <div id='feedWrapper'>
          <div id='notificationsContainer'>
            <span id='feedTitle'>Notifications</span>
            {
              this.state.notifications.map((notification) => {
                return (
                  <div key={notification.id} className='notification'>
                    <img className='notificationIcon' src={notification.icon} />
                    <span>{notification.text}</span>
                    <span className='notificationDate'>{notification.dateString}</span>
                  </div>
                )
              })
            }
          </div>
        </div>
      )
    }
    return null
  }
}

NotificationFeed.propTypes = {
  shouldShow: PropTypes.bool
}

