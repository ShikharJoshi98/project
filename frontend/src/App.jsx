import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  

  return (
    <div >
      
      <Router>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} className='overflow-y-hidden' />
          <Route path="/register" element={<Register/>}/>

      </Routes>
    </Router>
    </div>
  )
}

export default App
