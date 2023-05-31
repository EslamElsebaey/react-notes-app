import React, {   useEffect } from 'react'
import {Link, useLocation} from "react-router-dom"
import jwtDecode from "jwt-decode";
import $ from "jquery"

function Navbar() {

useEffect(() => {
    $(".nav-link").click(()=>{
        $('.navbar-collapse').removeClass('show');
    })
}, [])


  
    let location = useLocation() ; 

    function logOut(){
        localStorage.removeItem("userToken");
        localStorage.removeItem("noteId");
    }

    
       if(localStorage.getItem("userToken")) {
            let userToken = localStorage.getItem("userToken");
             let user =  jwtDecode(userToken)
            var userName = user.first_name
       }
  return (
   <>
   
   <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
            <Link  className="navbar-brand" to="/home">Notes</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <i className="fas fa-bars"></i>
                </button>
            <div className="collapse navbar-collapse" id="navbarNav">
               {location.pathname === "/home" ? <ul className="navbar-nav ml-auto">
                {

                userName && <li className="nav-item"> <span className='nav-link' >Hello {userName} <i className="fas fa-heart"></i></span> </li>
                  
                  
                }
                    
                    <li className="nav-item">
                        <Link onClick={logOut}  className="nav-link" to="/">Logout</Link>
                    </li>
                </ul> :  <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link  className="nav-link" to="/register">Register</Link>
                    </li>
                    <li className="nav-item">
                    <Link  className="nav-link" to="/login">Login</Link>
                    </li>
                </ul>  } 
               
            </div>
        </div>
    </nav>
   </>
  )
}

export default Navbar
