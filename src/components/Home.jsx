import React, { useEffect, useState } from 'react'
import { account } from '../services/Appwriteconfig';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

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
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">Navbar</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                Home
              </li>
              <li class="nav-item">
                About
              </li>
              <li class="nav-item" onClick={(e) => { handlelogout(e) }}>
                Logout
              </li>

            </ul>

          </div>
        </div>
      </nav>

    </>
  )
}

export default Home
