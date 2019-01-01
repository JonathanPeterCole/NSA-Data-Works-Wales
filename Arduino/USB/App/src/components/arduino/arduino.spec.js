import React from 'react'
import { shallow } from 'enzyme'

// Component
import Arduino from './arduino'

// Library
import { mockConnect } from '../../library/arduino-connect/arduino-connect'

// Mock Arduino Connect
jest.mock('../../library/arduino-connect/arduino-connect')

// Prepare a test Arduino
const testArduino = {
  comName: 'COM1',
  serialNumber: '0123456789'
}

// Tests
describe('Arduino Component', () => {
  beforeEach(() => {
    // Clear mockConnect before each test
    mockConnect.mockClear()
  })

  it('Renders without crashing', () => {
    // Attempt to render the results component
    // Shallow render to ensure we are only testing the Arduino component
    shallow(<Arduino arduino={testArduino} />)
  })

  it('Matches snapshot', () => {
    // Compare the component to the snapshot
    const wrapper = shallow(<Arduino arduino={testArduino} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('Arduino Connect library called with comName', () => {
    // Render the component and then check if the mockConnect function has been called
    shallow(<Arduino arduino={testArduino} />)
    expect(mockConnect).toHaveBeenCalledWith('COM1')
  })
})
