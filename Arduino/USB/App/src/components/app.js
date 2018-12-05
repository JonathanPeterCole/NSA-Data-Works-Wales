import React from 'react'

export default class App extends React.Component {
  render () {
    return (
      <div>
        <h1>Hello World!</h1>
        We are using Node.js {process.versions.node},
        Chromium {process.versions.chrome},
        and Electron {process.versions.electron}.
      </div>
    )
  }
}
