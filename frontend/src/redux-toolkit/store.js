import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducer/authReducer';
import errorReducer from '../reducer/errorReducer';
import itemReducer from '../reducer/itemReducer';

export default configureStore({
    reducer: {
        authReducer: authReducer,
        errorReducer: errorReducer,
        itemReducer: itemReducer,
    }
})