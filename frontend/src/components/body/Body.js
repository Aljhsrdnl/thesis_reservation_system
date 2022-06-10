import React from 'react'
import {Routes, Route} from 'react-router-dom'
// import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Login from '../../components/Login'
// import Login_2 from './auth/Login_2'
import Register from './auth/Register.jsx'
import ActivationEmail from './auth/ActivationEmail'

import ForgotPass from '../body/auth/ForgotPassword'
import ResetPass from '../body/auth/ResetPassword'

// import Profile from '../body/profile/Profile'
import EditUser from '../body/profile/EditUser'


import HomeScreen from '../../screens/HomeScreen'
import BagScreen from '../../screens/BagScreen'
import ReserveItemScreen from '../../screens/ReserveItemScreen'

import NotFound from '../utils/NotFound/NotFound'

import {useSelector} from 'react-redux'
import ReserveScreen from '../../screens/ReserveScreen'

function Body() {
    const auth = useSelector(state => state.auth)
    const {user, isLogged, isAdmin} = auth
    return (
        <section>
            <Routes>
                <Route path="/" element={isLogged ? <HomeScreen/> : <Login/>} />
                <Route path="/reserveItem/:itemID/:itemName" element={<ReserveItemScreen/>} />
                <Route path="/bag/:id" element={<BagScreen/>} />
                <Route path="/reserve" element={<ReserveScreen />} />

                <Route path="/login" element={isLogged ? <HomeScreen/> : <Login/>} />
                <Route path="/register" element={ <Register/>}  />

                <Route path="/forgot_password" element={isLogged ? <NotFound/> : <ForgotPass/>}  />
                <Route path="/user/reset/:token" element={isLogged ? <NotFound/> : <ResetPass/>}  />

                <Route path="/user/activate/:activation_token" element={<ActivationEmail/> }/>

                <Route path="/profile" element={isLogged ? <HomeScreen/> : <NotFound/>} />
                <Route path="/edit_user/:id" element={isAdmin ? <EditUser/> : <NotFound/>}  />

            </Routes>
        </section>
        
    )
}

export default Body
