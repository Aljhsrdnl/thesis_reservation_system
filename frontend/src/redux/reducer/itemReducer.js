import { GET_ITEMS,  ITEMS_LOADING, GET_ONE_ITEM } from '../actions/type';
// ADD_ITEM, UPDATE_ITEM, DELETE_ITEM,
const initialState = {
    items: [],
    isLoading: false,
}

export default function(state=initialState, action){
    switch(action.type){
        case GET_ITEMS:
            return{
                ...state,
                items: action.payload,
                isLoading: false
            }
        case GET_ONE_ITEM:
                return {
                    ...state,
                    items: action.payload,
                    isLoading: false
                }

        // case ADD_ITEM:
        //     return{
        //         ...state,
        //         items: [action.payload, ...state.items]
        //     }

        // case DELETE_ITEM:
        //     return{
        //         ...state,
        //         items: state.items.filter(item => item._id!==action.payload)                
        //     };

        // case UPDATE_ITEM:
        //     const { id, data } = action.payload;
        //     return{
        //         ...state,
        //         items: state.items.map(item => {
        //             if(item._id===id){
        //                 item = data;
        //             }
        //         })
        //     }

        case ITEMS_LOADING:
            return{
                ...state,
                isLoading: true
            }

        default:
            return state;
    }
}