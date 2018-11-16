function socketApi (socket) {
  // Log the connection
  console.log('Client connected')

  // Log disconnection and clear the interval
  socket.on('disconnect', () => {
    console.log('Client disconnected')
  })
}

module.exports = socketApi
