import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';


//Components

import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";

//Screens
import HomeScreen from "./screens/HomeScreen";

function App() {
  return (
    <div className="max-w-7xl block mx-auto">
     {/* <Login /> */}
      <BrowserRouter>
      <Navbar/>
          <Routes>
            <Route path="/signup" element={ <Signup /> }/>
            <Route path="/login" element={ <Login /> }/>
            <Route path="/homescreen" element={ <HomeScreen /> }/>
          </Routes>
      </BrowserRouter>
      
         
    </div>
  );
}

export default App;
