import axios from 'axios';
import { returnErrors } from './errorAction';
import { BAG_LOADING, GET_BAG, ADD_TO_BAG, DELETE_FROM_BAG } from './type';

export const getCart = (userID) => dispatch => {
    dispatch(setCartLoading());
    axios.get(`/bag/${userID}`)
        .then(res => dispatch({
            type: GET_BAG,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const addToCart = (userID, productId, quantity, name) => dispatch => {
    axios.post(`/bag/${userID}`, {userID, productId, quantity, name})
        .then(res => dispatch({
            type: ADD_TO_BAG,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const deleteFromCart = (userId, itemId) => dispatch => {
    axios.delete(`/bag/${userId}/${itemId}`)
        .then(res => dispatch({
            type: DELETE_FROM_BAG,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const setCartLoading = () => {
    return{
        type: BAG_LOADING
    }
}