import React, { useEffect, useState } from 'react'
import { account } from '../services/Appwriteconfig';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import upload from "../assets/Upload.svg";

const Home = () => {

  let navigate = useNavigate();

  const [userDetails, setUserDetails] = useState();

  const fetchUser = async () => {
    try {
      const user = await account.get();
      console.log(user);

    } catch (error) {
      console.log(error);
      navigate("/");
    }
  };

  useEffect(() => {
    fetchUser();

  }, []);


  //* Logout
  const handlelogout = async (e) => {
    e.preventDefault();

    try {

      await account.deleteSessions();
      alert("Logged you out ")
      navigate("/");
      //     const user = await account.get();
      //     console.log(user.$id);
      //     console.log(localStorage.getItem('token'));
    } catch (error) {
      console.log(error);
      alert("Please try again later, server is having issues !! ")
    }

  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">WallHub</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 navbar_ul">
              <li className="nav-item">
                Home
              </li>
              <li className="nav-item">
                About
              </li>
              <li className="nav-item" onClick={(e) => { handlelogout(e) }}>
                Logout
              </li>

            </ul>

          </div>
        </div>
      </nav>

      <div className="container-fluid uploadparent">
        <div className="uploadimgdiv">
          <img src={upload} alt="" className='upload_image' />
        </div>

        <div className="uploadtextdiv">
          <h2>Upload the finest wallpapers you have !! </h2>
          <input type="file" name="" id="" />
          <button className='btn btn-warning'>Upload</button>
        </div>
      </div>
    </>
  )
}

export default Home
