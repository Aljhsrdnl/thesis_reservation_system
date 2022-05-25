
import { BAG_LOADING, GET_BAG, ADD_TO_BAG, DELETE_FROM_BAG } from '../actions/types';

const initialState = {
    bag: null,
    loading: false
}

export default function(state=initialState, action){
    switch(action.type){
        case GET_BAG:
            return {
                ...state,
                bag: action.payload,
                loading: false
            }

        case ADD_TO_BAG:
            return {
                ...state,
                bag: action.payload
            }

        case DELETE_FROM_BAG:
            return {
                ...state,
                bag: action.payload
            }

        case BAG_LOADING:
            return {
                ...state, 
                loading: true
            }

        default:
            return state;
    }
}