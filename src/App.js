import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import {useState} from 'react'
import About from "./components/About";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";

function App() {
  const [alert, setAlert] = useState(null)

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type
    })
    setTimeout(() => {
        setAlert(null)
    }, 1500);
  }
  return (
    <div>
      <NoteState>
      <BrowserRouter>
          <Navbar showAlert={showAlert}/>
          <Alert alert={alert}/>
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert}/>}/>
            <Route exact path="about" element={<About/>} />
            <Route exact path="login" element={<Login showAlert={showAlert}/>} />
            <Route exact path="signup" element={<Signup showAlert={showAlert}/>} />
          </Routes>
        </div>
      </BrowserRouter>
      </NoteState>
    </div>
  );
}

export default App;
