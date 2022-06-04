import {combineReducers} from 'redux'
import item from './itemReducer'
import auth from './authReducer'
import token from './tokenReducer'
import users from './userReducer'
import bag from './bagReducer'

export default combineReducers({
    auth,
    token,
    users, 
    item,
    bag
})