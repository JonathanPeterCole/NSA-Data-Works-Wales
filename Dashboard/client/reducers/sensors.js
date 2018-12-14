const sensors = (state = [], action) => {
  switch (action.type) {
    case 'ADD_DATA':
      return (
        {
          sensors: {
            ...state.sensors,
            ...action.data
          }
        }
      )
    case 'ACTIVE_SENSOR':
      return (
        {
          sensors: {
            ...state.sensors,
            active: { ...state.sensors.active, ...action.data }
          }
        }
      )
    case 'REMOVE_LAST':
      return (
        {}
      )
    default:
      return state
  }
}
export default sensors
