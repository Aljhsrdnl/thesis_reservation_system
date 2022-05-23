import "./App.css";
// import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

//Components
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup"

//Screens
import HomeScreen from "./screens/HomeScreen";

function App() {
  return (
    <div className="">
     
      <Signup />
    </div>
    //   <Router>
    //       <Navbar/>

    //       <main>
    //         <Routes>
    //           <Route path="/" element={HomeScreen}/>
    //         </Routes>
    // </main>
    //   </Router>
  );
}

export default App;
