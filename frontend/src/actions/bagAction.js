import axios from 'axios';
import { returnErrors } from './errorActions';
// import { GET_CART, ADD_TO_CART, DELETE_FROM_CART, CART_LOADING } from './types';
import { BAG_LOADING, GET_BAG, ADD_TO_BAG, DELETE_FROM_BAG } from './types';

export const getCart = (id) => dispatch => {
    dispatch(setCartLoading());
    axios.get(`/bag/${id}`)
        .then(res => dispatch({
            type: GET_BAG,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const addToCart = (id, productId, quantity) => dispatch => {
    axios.post(`/bag/${id}`, {productId, quantity})
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