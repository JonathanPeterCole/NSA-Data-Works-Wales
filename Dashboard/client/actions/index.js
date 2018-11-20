import * as types from '../constants/actionTypes'

export const addData = (id, data) => ({
    type: types.ADD_DATA,
    id: id,
    data: data
})