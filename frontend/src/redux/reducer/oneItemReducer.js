import { GET_ONE_ITEM, ITEMS_LOADING } from "../actions/type";

const initialState = {
    item: [],
    isLoading: false,
}

export default function (state = initialState, action) {
    switch(action.type){
        case GET_ONE_ITEM:
        return {
            ...state,
            item: action.payload,
            isLoading: false
        }
        case ITEMS_LOADING:
            return {
                ...state,
                isLoading: true
            }
        default:
            return state;
    }
}