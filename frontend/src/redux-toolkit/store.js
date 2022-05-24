import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducer/authReducer';
import errorReducer from '../reducer/errorReducer';

export default configureStore({
    reducer: {
        authReducer: authReducer,
        errorReducer: errorReducer,
    }
})