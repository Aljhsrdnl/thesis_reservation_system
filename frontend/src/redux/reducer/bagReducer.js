
import { BAG_LOADING, GET_BAG, ADD_TO_BAG, DELETE_FROM_BAG } from '../actions/type';

const initialState = {
    bag: [],
    isLoading: false
}

export default function(state=initialState, action){
    switch(action.type){
        case GET_BAG:
            return {
                ...state,
                bag: action.payload,
                isLoading: false
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
                isLoading: true
            }

        default:
            return state;
    }
}