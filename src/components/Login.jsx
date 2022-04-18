import React from 'react'
import Loginpic from "../assets/Login.svg"
import "../styles/Login.css"
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

const Login = () => {
  return (
    <>

      <div className="container-fluid login_parent">
        <div className="image_div">
          <img src={Loginpic} alt="" className='login_pic' />
        </div>
        <div className="bodytext_div">
          <h1>Login to WallHub</h1>
          <form>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Email adress' />
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder='Password' />

            <button type="button" class="btn btn-warning">Warning</button>
          </form>

          <hr />
          <h3>Or login with</h3>
          <FcGoogle />
          <FaFacebook />
        </div>
      </div>
    </>
  )
}

export default Login