import axios from 'axios';
import { GET_ITEMS,  ITEMS_LOADING, GET_ONE_ITEM } from './type';
// ADD_ITEM, DELETE_ITEM, UPDATE_ITEM,
import { returnErrors } from '../actions/errorAction';


export const getItems = () => dispatch => {
    dispatch(setItemsLoading());
    axios.get('/api/items')
        .then(res => dispatch({
            type: GET_ITEMS,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// export const getOneItem = (id) => dispatch => {
//     axios.get(`/api/item/${id}`)
//         .then(res => dispatch({
//             type: GET_ONE_ITEM,
//             payload: res.data
//         }))
//         .catch(err => console.log(err))
// }


        

// export const addItem = (item) => (dispatch) => {
//     axios.post('/api/items', item)
//         .then(res => dispatch({
//             type: ADD_ITEM,
//             payload: res.data
//         }))
//         .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
// }

// export const deleteItem = (id) => (dispatch) => {
//     axios.delete(`/api/items/${id}`)
//         .then(res => dispatch({
//             type: DELETE_ITEM,
//             payload: id
//         }))
//         .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
// }

// export const updateItem = (id, item) => (dispatch) => {
//     axios.put(`/api/items/${id}`, item)
//         .then(res => dispatch({
//             type: UPDATE_ITEM,
//             payload: Promise.all([id, res.data])
//         }))
//         .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
// }

export const setItemsLoading = () => {
    return{
        type: ITEMS_LOADING
    }
}