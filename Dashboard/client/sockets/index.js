import * as types from '../constants/actionTypes'
import { addKnownMessage, addUnknownMessage } from '../actions'

const setupSocket = (dispatch, username) => {
  const socket = new WebSocket('ws://localhost:8989')

  socket.onopen = () => {
    socket.send(JSON.stringify({
      type: types.ADD_USER,
      name: username
    }))
  }
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data)
    switch (data.type) {
      case types.ADD_UNKNOWN_MESSAGE:
        dispatch(ADD(data.message, data.author))
        break
      case types.ADD_KNOWN_MESSAGE:
        dispatch(addUser(data.name))
        break
      default:
        break
    }
  }

  return socket
}

export default setupSocket