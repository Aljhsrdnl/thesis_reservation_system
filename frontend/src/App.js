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
        {/* <Header/> */}
        <ToastContainer />
        <NavBar/>
        {/* <Navbar click ={() => setSideToggle(true)}/>
        <Backdrop show ={sideToggle} click={()=> setSideToggle(false)}/> */}
        <Body/>
        {/* <main>
          <Routes>
            <Route exact path="/" component={HomeScreen}/>
            <Route path="/login" component={isLogged ? NotFound : Login} exact />
          </Routes>
        </main> */}
        {/* <Router>
          <Switch>
          <NavBar />
          <Route path="/" component={Login} exact />
                <Route path="/homescreen" component={HomeScreen} />
                <Route path="/bag" component={BagScreen} />
          </Switch>
        </Router> */}
        </div>
    </Router> 
  );
}

export default App;


// import "./App.css";
// import { BrowserRouter, Routes, Route } from 'react-router-dom';


// //Components

// import Navbar from "./components/Navbar";
// import Login from "./components/Login";
// import Signup from "./components/Signup";

// //Screens
// import HomeScreen from "./screens/HomeScreen";

// function App() {
//   return (
//     <div className="max-w-7xl block mx-auto">
//      {/* <Login /> */}
//       <BrowserRouter>
//       <Navbar/>
//           <Routes>
//             <Route path="/signup" element={ <Signup /> }/>
//             <Route path="/login" element={ <Login /> }/>
//             <Route path="/homescreen" element={ <HomeScreen /> }/>
//           </Routes>
//       

      
         
//     </div>
//   );
// }

// export default App;
