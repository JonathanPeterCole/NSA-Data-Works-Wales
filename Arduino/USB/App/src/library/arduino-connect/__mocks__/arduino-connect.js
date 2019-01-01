// Prepare mock functions
export const mockConnect = jest.fn()
export const mockEvent = jest.fn()

// Set the mock implementation
const mock = jest.fn().mockImplementation(() => {
  return {
    connect: mockConnect,
    on: mockEvent
  }
})

export default mock
