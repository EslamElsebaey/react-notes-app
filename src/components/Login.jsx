import axios from 'axios';
import React, {  useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Joi from 'joi';

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

  
 function validatUserLogin() {
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
    if(validatUserLogin() === true){
        setError("")
        let {data} = await axios.post("https://route-movies-api.vercel.app/signin" , userLogin);
        if(data.message === "success") {
            setTimeout(() => {
                navigation("/home");
            }, 2000);
            setSuccess(data.message);
            setError("")
           localStorage.setItem("userToken" , data.token)
         
        }else{
            setError(data.message)
        }
    }

  
   
 }






  return (
   <>
       <div className="container my-5 py-5">
        <div className="col-md-8 col-lg-5 p-0 m-auto text-center">
            <div className="login-parent">
            <form  onSubmit={sendData} action="/handleSignin" method="POST">
                <h2 className='text-center  mb-4'>Login</h2>
                <div className="form-group">
                    <input onChange={handleChange} autoComplete="email"  placeholder="Email" name="email" type="text" className="form-control" />
                  {errors.length ? errors.map((error , index)  => {
                    if(error.message.includes("email")){
                        return <ul key={index} className='alert alert-danger mt-3 errorslist'> 
                        <li >{errors[0].message}</li> </ul>
                    }else{
                        return  "";
                    }
                  }) : ""}
                </div>
                <div className="form-group">
                    <input onChange={handleChange} placeholder="Password" name="password" type="password" className="form-control" />
                    {errors.length ? errors.map((error , index)  => {
                    if(error.message.includes("password")){
                        return <ul key={index} className='alert alert-danger mt-3 errorslist'> 
                        <li >{errors[1].message}</li> </ul>
                    }else{
                        return  "";
                    }
                  }) : ""}
                </div>
                
                <button type="submit" className="btn signin-btn  w-100">Sign in</button>
                {
                    error &&
                     <div className="alert alert-danger  mt-3 text-center">
                        {error}
                    </div>
                }
                {success.includes("success") ?  <h5 className=' d-flex align-items-center justify-content-center alert alert-success  registermessage mt-3'> Successfully logined   <i className="fas fa-spinner fa-pulse"></i> </h5>  :""}
               
            </form>
            </div>
       
        </div>
    </div>
   
   
   </>
  )
}

export default Login
