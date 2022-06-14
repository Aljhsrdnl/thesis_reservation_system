import axios from 'axios';
import { GET_ONE_ITEM } from './type';

export const getOneItem = (id) => dispatch => {
        axios.get(`/api/item/${id}`)
            .then(res => dispatch({
                type: GET_ONE_ITEM,
                payload: res.data
            }))
            .catch(err => console.log(err))
    }