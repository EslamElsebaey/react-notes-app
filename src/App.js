import Navbar from "./components/Navbar";
import Home from './components/Home';
import { Routes , Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
// import Register from "./components/Register";
// import Login from './components/Login';
import NotFound from './components/NotFound';
import Protectedroute from './components/ProtectedRoute';




function App() {
  return (
  <>
    <Navbar/>
   <Routes>
    <Route path="/" element={<Login/>} />
    <Route path="/home" element={ <Protectedroute><Home/></Protectedroute> } />
    <Route path="/login" element={ <Login/>} />
    {/* <Route path="/react-notes-app" element={ <Login/>} /> */}
    <Route path="/register" element={<Register/>} />
    <Route path="*" element={<NotFound/>} />
   </Routes>
   <p className="developer">Made with <i className="fas fa-heart"></i> by <a target="_blank" href="https://www.linkedin.com/in/eslam-elsebaey-ab9564163/">Eslam Elsebaey</a></p>
  
   
 
  
  {/* <Login/> */}
  {/* <Register/> */}

  
  </>
  );
}

export default App;
