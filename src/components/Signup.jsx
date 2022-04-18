// import React, { useState } from "react";
// import SocialSignin from "./SocialSignin";
// import { Link } from "react-router-dom";
// import { account } from "../services/Appwriteconfig";

// const Signup = () => {

//   const [userDetails, setUserDetails] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const signupUser = async (e) => {
//     e.preventDefault();
//     try {
//       const newuser = await account.create('unique()', userDetails.email, userDetails.password, userDetails.name);
//       console.log(newuser);
//     } catch (error) {
//       console.log(error);
//     }

//   };

//   return (
//     <div>
//       <h2 className="mt-5 text-center">Super Auth</h2>
//       <h3 className=" text-center">Signup</h3>

//       <form className="container">
//         <div className="mb-3">
//           <label for="name" className="form-label">
//             Name
//           </label>
//           <input
//             onChange={(e) => {
//               setUserDetails({
//                 ...userDetails,
//                 name: e.target.value,
//               });
//             }}
//             type="text"
//             className="form-control"
//             id="name"
//             required
//             aria-describedby="name"
//             name="name"
//           />
//         </div>
//         <div className="mb-3">
//           <label for="email" className="form-label">
//             Email address
//           </label>
//           <input
//             onChange={(e) => {
//               setUserDetails({
//                 ...userDetails,
//                 email: e.target.value,
//               });
//             }}
//             type="email"
//             className="form-control"
//             id="email"
//             required
//             aria-describedby="email"
//             name="email"
//           />
//         </div>
//         <div className="mb-3">
//           <label for="password" className="form-label">
//             Password
//           </label>
//           <input
//             onChange={(e) => {
//               setUserDetails({
//                 ...userDetails,
//                 password: e.target.value,
//               });
//             }}
//             required
//             type="password"
//             className="form-control"
//             id="password"
//             name="password"
//           />
//         </div>
//         <div className="mb-3">
//           <span>Already have an account ? </span>{" "}
//           <Link to="/login">
//             <button className="btn btn-primary">Login</button>
//           </Link>
//         </div>

//         <button
//           onClick={(e) => signupUser(e)}
//           type="submit"
//           className="btn btn-success"
//         >
//           Signup
//         </button>
//       </form>

//       <SocialSignin />

//     </div>
//   );
// };

// export default Signup;


import React, { useState } from 'react'
import Registerpic from "../assets/Register.svg"
import "../styles/Login.css"
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { account } from "../services/Appwriteconfig";

const Signup = () => {
  const [creds, setcreds] = useState({ name: "", email: "", password: "" });

  //onchange event for email and password
  const handleChange = (e) => {
    setcreds({
      ...creds,
      [e.target.name]: e.target.value,
    });

    console.log(creds);
  };

  //onclick event for signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newuser = await account.create('unique()', creds.email, creds.password, creds.name);
      console.log(newuser);
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <>

      <div className="container login_parent">
        <div className="image_div">
          <img src={Registerpic} alt="" className='login_pic' />
        </div>
        <div className="bodytext_div">
          <h1 className='login_header'>Signup to WallHub</h1>
          <form className='login_form'>
            <input
              onChange={(e) => {
                handleChange(e)
              }}
              type="text"
              className="form-control"
              id="name"
              required
              aria-describedby="name"
              name="name"
              value={creds.name}
            />

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
            <p>Already have an account ? <Link to={"/"}>Login</Link> here</p>
          </form>

          <hr />
          <br />

          <h2 className='login_with'>Or signup with</h2>
          <FcGoogle className='social_icons' />
          <FaFacebook className='social_icons' />
        </div>
      </div>
    </>
  )
}

export default Signup