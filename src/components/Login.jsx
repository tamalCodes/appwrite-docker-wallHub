import React, { useState } from 'react'
import Loginpic from "../assets/Login.svg"
import "../styles/Login.css"
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Login = () => {

  const [creds, setcreds] = useState({ email: "", password: "" });
  return (
    <>

      <div className="container login_parent">
        <div className="image_div">
          <img src={Loginpic} alt="" className='login_pic' />
        </div>
        <div className="bodytext_div">
          <h1 className='login_header'>Login to WallHub</h1>
          <form className='login_form'>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Email adress' />
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder='Password' />

            <button type="button" class="btn btn-warning">Submit</button>
            <p>Don't have an account ? <Link to={"/signup"}>Signup</Link> here</p>
          </form>

          <hr />
          <br />

          <h2 className='login_with'>Or login with</h2>
          <FcGoogle className='social_icons' />
          <FaFacebook className='social_icons' />
        </div>
      </div>
    </>
  )
}

export default Login