    // import './App.css';
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import {
  dispatchLogin,
  fetchUser,
  dispatchGetUser
} from "./redux/actions/authAction";

import Header from "./components/Header";
// import Navbar from "./components/Navbar"
import Body from "./components/body/Body";
import Backdrop from "./components/Backdrop";

import NavBar from "./components/NavBar.jsx"
import NotFound from './components/utils/NotFound/NotFound'
//SCREENS



function App() {
  // const [sideToggle, setSideToggle] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);
  
  const {user, loading, isLogged} = auth;
  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      const getToken = async () => {
        const res = await axios.post("/user/refresh_token", null);
        dispatch({ type: "GET_TOKEN", payload: res.data.access_token });
      };
      getToken();
    }
  }, [auth.isLogged, dispatch]);

  useEffect(() => {
    if (token) {
      const getUser = () => {
        dispatch(dispatchLogin());

        return fetchUser(token).then((res) => {
          dispatch(dispatchGetUser(res));
        });
      };
      getUser();
    }
  }, [token, dispatch]);

  

  
  
  return (
    <Router>
      <div className="App relative">
        
        <ToastContainer />
        <NavBar/>
        
        <Body/>
       
        </div>
    </Router> 
  );
}

export default App;

