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
    try {
      e.preventDefault();
      await account.deleteSessions();
      navigate("/");

    } catch (error) {
      console.log(error);
    }

  };

  return (
    <div className="container-xxl border mt-5 p-3">
      <h3 className="text-center"> Super Auth </h3>
      <h6 className='d-flex justify-content-end' >Welcome, Username </h6>
      <div className="d-flex justify-content-end align-items-center">

        <button className="btn btn-danger mx-1" onClick={(e) => { handlelogout(e) }}>Logout</button>
        <button className="btn btn-primary mx-1">Change Password</button>
      </div>

      <div className="my-3">
        <h6>UID : </h6>
        <h6>Name : </h6>
        <h6>Email : </h6>
        <h6>Email Verified :</h6>

        <h6>Registered on :</h6>
      </div>
      <div className="d-flex justify-content-end align-items-center">
        <button className="btn btn-outline-danger">Delete Account</button>
      </div>
    </div>
  )
}

export default Home
