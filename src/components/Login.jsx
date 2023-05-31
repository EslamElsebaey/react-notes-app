import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Joi from 'joi';
import $ from "jquery"

function Login() {


    let navigation =   useNavigate() ; 
    const [success  , setSuccess] = useState("")
    const [errors , setErrors] = useState([]);

const [userLogin , setUserLogin] = useState({
    email : '' , 
    password : ""
})

const [error , setError] = useState(""); 

 function  handleChange (e) {
   let newUser = {...userLogin} ; 
   newUser[e.target.name] = e.target.value;
   setUserLogin(newUser);
 }

  
 function validateLoginUser() {
    let schema = Joi.object({
        email : Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required() ,
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    })
      let validate =   schema.validate(userLogin , {abortEarly  : false}); 
      if(validate.error !== undefined){
       setErrors(validate.error.details)
       setError("")
       return false
      }else{
       setErrors("")
       return true
      }
     }
   

  async function sendData(e) {
    e.preventDefault() ;
    if(validateLoginUser() === true){
        setError("")
        let {data} = await axios.post("https://route-movies-api.vercel.app/signin" , userLogin);
        if(data.message === "success") {
            setSuccess(data.message);
            setError("")
           localStorage.setItem("userToken" , data.token)
            setTimeout(() => {
                navigation("/home");
            }, 2000);
        }else{
            setError(data.message)
        }
    }
   
 }






  return (
   <>
       <div className="container my-5 py-5">
        <div className="col-md-5 p-0 m-auto text-center">
            <div className="login-parent">
            {
                    error &&
                     <div className="alert alert-danger  mt-3 text-center">
                        {error}
                    </div>
                }
            {errors.length > 0 ?  <ul className='alert alert-danger mt-3 errorslist'>
          {errors.length > 0 ? errors.map((error , index) => {
            if(error.message.includes("pattern")){
              error.message = "Password must start with small character";
            }
            return <li key={index} className=''>{error.message}</li>
          }) : ""}
          </ul> : "" }  
            <form autocomplete="on" onSubmit={sendData} action="/handleSignin" method="POST">
                <h2 className='text-center  mb-4'>Login</h2>
                <div className="form-group">
                    <input onChange={handleChange}  placeholder="Email" name="email" type="email" className="form-control" />
                </div>
                <div className="form-group">
                    <input onChange={handleChange} placeholder="Password" name="password" type="password" className="form-control" />
                </div>
                <button type="submit" className="btn signin-btn  w-100">Sign in</button>
                {success.includes("success") ?  <h5 className=' d-flex align-items-center justify-content-center alert alert-success  registermessage mt-3'> Successfully logined   <i className="fas fa-spinner fa-pulse"></i> </h5>  :""}
               
            </form>
            </div>
       
        </div>
    </div>
   
   
   </>
  )
}

export default Login
