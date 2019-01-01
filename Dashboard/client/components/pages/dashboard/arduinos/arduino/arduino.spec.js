import React from 'react'
import { shallow } from 'enzyme'

// Component
import Arduino from './arduino'

// Prepare a test Arduino
const testArduino = {
  name: 'Test Arduino',
  colour: 'blue',
  online: true,
  lastConnection: 0,
  sensors: [
    {
      id: 0,
      type: 'temperature',
      online: true,
      readings: []
    }
  ]
}

// Prepare a mock onClick function
const mockOnClick = jest.fn()

// Tests
describe('Arduino Component', () => {
  beforeEach(() => {
    // Clear mockOnClick before each test
    mockOnClick.mockClear()
  })

  it('Renders without crashing', () => {
    // Attempt to render the Arduino component
    // Shallow render to ensure we are only testing the Arduino component
    shallow(
      <Arduino
        name={testArduino.name}
        colour={testArduino.colour}
        online={testArduino.online}
        lastConnection={testArduino.lastConnection}
        sensors={testArduino.sensors}
        onClick={mockOnClick} />
    )
  })

  it('Matches snapshot', () => {
    // Compare the component to the snapshot
    const wrapper = shallow(
      <Arduino
        name={testArduino.name}
        colour={testArduino.colour}
        online={testArduino.online}
        lastConnection={testArduino.lastConnection}
        sensors={testArduino.sensors}
        onClick={mockOnClick} />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('Calls the open modal function on click', () => {
    // Render the component
    const wrapper = shallow(
      <Arduino
        name={testArduino.name}
        colour={testArduino.colour}
        online={testArduino.online}
        lastConnection={testArduino.lastConnection}
        sensors={testArduino.sensors}
        onClick={mockOnClick} />
    )
    // Simulate a click on the Arduino box
    wrapper.find('div.box').first().simulate('click')
    // Check if the mockOnClick was called
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })
})
