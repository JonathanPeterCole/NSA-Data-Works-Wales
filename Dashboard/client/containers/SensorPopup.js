
import { connect } from 'react-redux'
import SensorPopupComponent from '../components/sensor/SensorPopup'



const mapStateToProps = state => {
    let data ={};
    console.log("aa")
    let sensors=   state.sensors.unknown.concat(state.sensors.known);
    for(let sensor in sensors){
        if(sensors[sensor].id === state.sensors.active.id){
            data.data = sensors[sensor];
        }
    }
    console.log(data)
    return {
        data
    }
}

export const SensorPopup = connect(mapStateToProps  , () => ({}))(SensorPopupComponent)