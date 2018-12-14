class NotificationsController {
  constructor (email) {
    this.email = email
    this.subscriptions = { offline: [], online: [], outrange: [], inrange: [], higherThan: [], lessThan: [] }
  }
  /* Finds the type of the notification and calls the associated function */
  subscribeWith (notification, id) {
    try {
      notification.lastSent = new Date()
      this.subscriptions[notification.notificationType].push({ ...notification })
    } catch (e) {
      console.log(e)
    }
  }

  /* Finds the type of the message and calls the associated function */
  triggerEvents (type, sensor) {
    switch (type) {
      case 'offline':
        this.offlineHandler(sensor)
        break
      case 'reading':
        this.readingHandler(sensor)
        break
      default:
        // console.log(`Unknown notification type ${notification.notificationType} provided.`)
        break
    }
  }

  readingHandler (sensor) {
    this.subscriptions.higherThan.forEach(subscription => {
    //   let message = this.messageArgs(subscription.message, subscription)
      if (subscription.sensorid === sensor.id && subscription.args.limit < sensor.newdata[sensor.newdata.length - 1].reading && (new Date() - subscription.lastUpdate > 5000)) {
        this.notificationHandler(subscription)
        subscription.lastUpdate = new Date()
      }
    })
    this.subscriptions.lessThan.forEach(subscription => {
      if (subscription.sensorid === sensor.id && subscription.args.limit > sensor.newdata[sensor.newdata.length - 1].reading && (new Date() - subscription.lastUpdate > 5000)) {
        this.notificationHandler(subscription)
        subscription.lastUpdate = new Date()
      }
    })
  }

  /* NOTIFICATION TYPE HANDLERS */
  offlineHandler (sensor) {
    // let message = `Sensor ${notification.sensor} with ID ${notification.sensorid} has gone offline`;
    // this.offline.push({id: notification.sensorid, message: message, type: notification.messageType})
    this.subscriptions.offline.forEach(subscription => {
      if (subscription.sensorid === sensor.id && (new Date() - subscription.lastUpdate > 5000)) {
        this.notificationHandler(subscription)
        subscription.lastUpdate = new Date()
      }
    })
  }

  notificationHandler (subscription) {
    switch (subscription.messageType) {
      case 'email':
        this.emailHandler(subscription)
        break
    }
  }

  /* MESSAGE TYPE HANDLERS */
  emailHandler (subscription) {
    let message = this.messageArgs(subscription.message, subscription)
    subscription.recipients.forEach(recipient => {
      this.email.sendMail('batutestmailer@gmail.com', recipient, 'Notification', message)
    })
  }

  messageArgs (message, data) {
    let nativeDataRegex = new RegExp(/{!(.*?)}/g)
    let argsRegex = new RegExp(/{([^!].*?)}/g)

    let nativeMatches = message.match(nativeDataRegex).map(val => {
      return val.replace('{', '').replace('}', '').replace('!', '')
    })
    let argsMatches = message.match(argsRegex).map(val => {
      return val.replace('{', '').replace('}', '')
    })

    nativeMatches.forEach(native => {
      message = message.replace('{!' + native + '}', data[native])
    })
    argsMatches.forEach(args => {
      message = message.replace('{' + args + '}', data.args[args])
    })

    return message
  }
}

module.exports = NotificationsController
