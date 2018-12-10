
import { connect } from 'react-redux'
import notificationFeedComponent from './notification-feed'

const mapStateToProps = state => {
  return ({
    arduinos: state.arduinos
  })
}

export const NotificationsFeed = connect(mapStateToProps, {})(notificationFeedComponent)
