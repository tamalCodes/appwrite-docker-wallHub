import React, { useState, useEffect } from 'react'
import Loginpic from "../assets/Login.svg"
import "../styles/Login.css"
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { account } from "../services/Appwriteconfig";
import { useNavigate, useParams } from "react-router-dom";


const Login = () => {

  const [creds, setcreds] = useState({ email: "", password: "" });
  const [uderdetails, setuderdetails] = useState();

  let navigate = useNavigate();
  const params = useParams();


  async function fetchUser() {
    try {
      const user = await account.get();
      // console.log(user);
      if (user)
        navigate("/home")
    } catch (error) {
      console.log(error);

    }
  }
  useEffect(() => {
    fetchUser()


  }, []);


  const handleChange = (e) => {
    setcreds({
      ...creds,
      [e.target.name]: e.target.value,
    });


  };

  //onclick event for signup
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await account.createSession(creds.email, creds.password);
      const user = await account.get();
      console.log(user);
      alert("Logged you in successfully")
      navigate("/home")
    } catch (error) {
      console.log(error);
      alert("Please try again later, server is having issues !! ")
    }

  };


  // const handlelogout = async (e) => {
  //   e.preventDefault();

  //   try {

  //     // await account.deleteSessions();
  //     const user = await account.get();
  //     console.log(user.$id);
  //     console.log(localStorage.getItem('token'));
  //   } catch (error) {
  //     console.log(error);
  //   }

  // };

  const googlelogin = async (e) => {
    e.preventDefault();

    try {
      if (window.location.href === "http://localhost:3000/")
        await account.createOAuth2Session('google', 'http://localhost:3000/home', 'http://localhost:3000/');
      else
        await account.createOAuth2Session('google', 'https://wall-hub.vercel.app/home', 'https://wall-hub.vercel.app/');

    } catch (error) {
      console.log(error);
      alert("Please try again later, server is having issues !! ")
    }

  }



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

            {/* <button type="button" class="btn btn-danger" onClick={(e) => { handlelogout(e) }}>Submit</button> */}
            <p>Don't have an account ? <Link to={"/signup"}>Signup</Link> here</p>
          </form>

          <hr />
          <br />

          <h2 className='login_with'>Or login with</h2>
          <FcGoogle className='social_icons' onClick={(e) => { googlelogin(e) }} />
          <FaFacebook className='social_icons' />
        </div>
      </div>
    </>
  )
}

export default Login