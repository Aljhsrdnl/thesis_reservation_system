import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

//Components
import Navbar from "./components/Navbar";

//Screens
import HomeScreen from "./screens/HomeScreen";

function App() {
  return (
    <Router>
        <Navbar/>
        {/*<main>
          <Routes>
            <Route path="/" element={HomeScreen}/>
          </Routes>
  </main>*/}
    </Router>
  );
}

export default App;
