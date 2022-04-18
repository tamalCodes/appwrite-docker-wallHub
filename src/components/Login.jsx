import React, { useState, useEffect } from 'react'
import Loginpic from "../assets/Login.svg"
import "../styles/Login.css"
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { account } from "../services/Appwriteconfig";

const Login = () => {

  const [creds, setcreds] = useState({ email: "", password: "" });
  const [uderdetails, setuderdetails] = useState();

  const history = useHistory()



  const handleChange = (e) => {
    setcreds({
      ...creds,
      [e.target.name]: e.target.value,
    });


  };

  //onclick event for signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    await account.createSession(creds.email, creds.password);
    const user = await account.get();
    console.log(user);

  };


  const handlelogout = async (e) => {
    e.preventDefault();
    await account.deleteSessions();

  };


  return (
    <>

      <div className="container login_parent">
        <div className="image_div">
          <img src={Loginpic} alt="" className='login_pic' />
        </div>
        <div className="bodytext_div">
          <h1 className='login_header'>Login to WallHub</h1>
          <form className='login_form'>

            <input
              onChange={(e) => {
                handleChange(e)
              }}
              type="email"
              className="form-control"
              id="email"
              required
              aria-describedby="email"
              name="email"
              value={creds.email}
            />

            <input
              onChange={(e) => {
                handleChange(e)
              }}
              required
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={creds.password}
            />

            <button type="button" class="btn btn-warning" onClick={(e) => { handleSubmit(e) }}>Submit</button>

            <button type="button" class="btn btn-danger" onClick={(e) => { handlelogout(e) }}>Submit</button>
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