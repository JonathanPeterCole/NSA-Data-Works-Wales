const sensors = (state = [], action) => {
    console.log(state)
    switch(action.type){
        case 'ADD_DATA':
            return (
                {
                    sensors: {
                        ...state.sensors,
                        ...action.data
                    }
                }
            )
        break;
        case 'ACTIVE_SENSOR':
        return (
            {
                sensors: {
                    ...state.sensors,
                    active: {...state.sensors.active, ...action.data}
                }
            }
        )
    break;
        default:
            return state
    }
}
export default sensors;