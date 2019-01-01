import React from 'react'
import { shallow } from 'enzyme'

// Component
import ArduinoList from './arduino-list'

// Mock Arduino Connect
jest.mock('../../library/arduino-connect/arduino-connect')

// Prepare an array of test arduinos
const testArduinos = [
  {
    comName: 'COM1',
    serialNumber: '0000000001'
  },
  {
    comName: 'COM2',
    serialNumber: '0000000002'
  },
  {
    comName: 'COM3',
    serialNumber: '0000000003'
  }
]

// Tests
describe('Arduino List Component', () => {
  it('Renders without crashing', () => {
    // Attempt to render the Arduino List component
    // Shallow render to ensure we are only testing the ArduinoList component
    shallow(
      <ArduinoList
        arduinos={testArduinos}
        disconnected={null}
        api={null} />
    )
  })

  it('Matches snapshot', () => {
    // Compare the component to the snapshot
    const wrapper = shallow(
      <ArduinoList
        arduinos={testArduinos}
        disconnected={null}
        api={null} />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('Lists correct number of Arduinos', () => {
    const wrapper = shallow(
      <ArduinoList
        arduinos={testArduinos}
        disconnected={null}
        api={null} />
    )
    expect(wrapper.find('Arduino')).toHaveLength(3)
  })
})
