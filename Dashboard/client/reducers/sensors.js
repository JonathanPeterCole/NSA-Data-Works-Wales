const sensors = (state = [], action) => {
    switch(action.type){
        case 'ADD_DATA':
            return (
                {
                    id: action.id,
                    data: action.data                
                }
            )
        break;
        default:
            return state
    }
}
export default sensors;