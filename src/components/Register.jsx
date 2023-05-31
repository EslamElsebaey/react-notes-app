import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Joi from 'joi';

function Register() {

    const [errors , setErrors] = useState([]);
   let navigation =   useNavigate() ; 
    const [user , setUser] = useState({
        first_name : "" , 
        last_name : "" , 
        email : "" , 
        password: ""
    })
    const [success  , setSuccess] = useState("")
    const [error  , setError] = useState("")

    function getUserData (e) {
       let newUser  = {...user} ; 
       newUser[e.target.name] = e.target.value ; 
       setUser(newUser)
    }


    
 function validateUserData() {
    let schema = Joi.object({
      first_name : Joi.string()
      .alphanum()
      .min(3)
      .max(15)
      .required(), 
      last_name :Joi.string()
      .alphanum()
      .min(3)
      .max(15)
      .required(), 
      email : Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required() ,
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    })
      let validate =   schema.validate(user , {abortEarly  : false}); 
      if(validate.error !== undefined){
        setErrors(validate.error.details);
        setError("")
        return false
      }else{
        return true
      }
      
      
   }

    async  function sendData(e) {
        e.preventDefault() ;
        if(validateUserData() === true){
            let {data} = await axios.post("https://route-movies-api.vercel.app/signup" ,user ) ; 
            if(data.message === "success"){
                setSuccess(data.message);
                setError("")
                setErrors([])
                setTimeout(() => {
                    navigation("/login");
                }, 2000);
            }else{
                setError("Email already registered")
            }
        }
    }




  return (
    <>
    
    <div className="container mt-5 pt-5">
        <div className="col-md-5 m-auto text-center">
            <div className="register-parent">
            {errors.length > 0 ?  <ul className='alert alert-danger errorslist'>
          {errors.length > 0 ? errors.map((error , index) => {
              if(error.message.includes("alpha-numeric")){
                error.message = "Name must contains characters only"
              }
              if(error.message.includes("pattern")){
                error.message = "Password must start with small character"
              }
              if(error.message.includes("email")){
                error.message = "Email must be a valid email example johndoe123@gmail.com/net"
              }
              if(error.message.includes("age")){
                error.message = "Age must be greater then 18 and less than 80"
              }
            return <li key={index} className=''>{error.message}</li>
          }) : ""}
          </ul> : "" } 
            <form  onSubmit={sendData}>
            <h2 className='text-center  mb-4'>Register</h2>
                <div className="form-group">
                    <input placeholder="First name" onChange={getUserData} name="first_name" type="text" className=" form-control" />
                </div>
                <div className="form-group">
                    <input placeholder="Last name" onChange={getUserData} name="last_name" type="text" className=" form-control" />
                </div>
                <div className="form-group">
                    <input placeholder="Email" onChange={getUserData} type="text" name="email" className="form-control" />
                </div>
                <div className="form-group">
                    <input placeholder="Password" onChange={getUserData} type="password" name="password" className="form-control" />
                </div>
                
                <button type="submit" className="btn signup-btn  w-100">
                Sign up
                </button>
                {
                    error &&
                     <div className="alert alert-danger  mt-3 text-center">
                        {error}, go to <Link to="/login">login</Link>  page 
                    </div>
                }
                {success.includes("success") ?   <h5 className=' d-flex align-items-center justify-content-center alert alert-success  registermessage mt-3'> Successfully registered  <i className="fas fa-spinner fa-pulse"></i>   </h5> :""}
               
            </form>
            </div>
      
        </div>
    </div>
    </>
  )
}

export default Register
