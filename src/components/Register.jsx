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
        console.log(errors)
        setError("")
        return false
      }else{
        return true
      }
      
      
   }

    async  function sendData(e) {
        e.preventDefault() ;
        if(validateUserData() === true){
            let {data} = await axios.post("https://movies-api.routemisr.com/signup" ,user ) ; 
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
        <div className=" col-md-8 col-lg-5 p-0 m-auto text-center">
          <div className="register-parent">
            <form onSubmit={sendData}>
              <h2 className="text-center  mb-4"> تسجيل جديد</h2>
              <div className="form-group">
                <input
                  placeholder="الاسم الاول"
                  onChange={getUserData}
                  name="first_name"
                  type="text"
                  className=" form-control"
                />
              </div>
              {errors.length ? errors.map((error, index) => {
                console.log(errors)
                    if (error.path[0] === "first_name") {
                      return (
                        <ul
                          key={index}
                          className="alert alert-danger mt-2 errorslist"
                        >
                          <li>{error.message}</li>{" "}
                        </ul>
                      );
                    } else {
                      return "";
                    }
                  })
                : ""}
              <div className="form-group">
                <input
                  placeholder="الاسم الاخير "
                  onChange={getUserData}
                  name="last_name"
                  type="text"
                  className=" form-control"
                />
              </div>
              {errors.length
                ? errors.map((error, index) => {
                    if (error.path[0] === "last_name") {
                      return (
                        <ul
                          key={index}
                          className="alert alert-danger mt-2 errorslist"
                        >
                          <li>{error.message}</li>{" "}
                        </ul>
                      );
                    } else {
                      return "";
                    }
                  })
                : ""}
              <div className="form-group">
                <input
                  placeholder="البريد الالكترونى"
                  onChange={getUserData}
                  type="text"
                  name="email"
                  className="form-control"
                />
              </div>
              {errors.length
                ? errors.map((error, index) => {
                    if (error.path[0] === "email") {
                      return (
                        <ul
                          key={index}
                          className="alert alert-danger mt-2 errorslist"
                        >
                          <li>{error.message}</li>{" "}
                        </ul>
                      );
                    } else {
                      return "";
                    }
                  })
                : ""}
              <div className="form-group">
                <input
                  placeholder="كلمة المرور"
                  onChange={getUserData}
                  type="password"
                  name="password"
                  className="form-control"
                />
              </div>
              {errors.length
                ? errors.map((error, index) => {
                    if (error.path[0] === "password") {
                      return (
                        <ul
                          key={index}
                          className="alert alert-danger mt-2 errorslist"
                        >
                          <li>{error.message}</li>{" "}
                        </ul>
                      );
                    } else {
                      return "";
                    }
                  })
                : ""}

              <button type="submit" className="btn signup-btn  w-100">
                تسجيل
              </button>
              {error && (
                <div className="alert alert-danger  mt-3 text-center">
                  {error}, اذهب الى <Link to="/login">صفحة تسجيل الدخول</Link>{" "}
                </div>
              )}
              {success.includes("success") ? (
                <h5 className=" d-flex align-items-center justify-content-center alert alert-success  registermessage mt-3">
                  {" "}
                  تم التسجيل بنجاح{" "}
                  <i className="fas fa-spinner fa-pulse"></i>{" "}
                </h5>
              ) : (
                ""
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register
