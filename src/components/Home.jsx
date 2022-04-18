import React, { useEffect, useState } from 'react'
import { account, storage } from '../services/Appwriteconfig';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import upload from "../assets/Upload.svg";

const Home = () => {

  let navigate = useNavigate();

  const [userDetails, setUserDetails] = useState();
  const [image, setimage] = useState();
  const [imageList, setImageList] = useState([]);
  var allimages = [];

  const fetchUser = async () => {
    try {
      const user = await account.get();
      console.log(user);

    } catch (error) {
      console.log(error);
      navigate("/");
    }
  };

  //Get the list of images from appwrite
  const getImage = async () => {
    try {
      allimages = await storage.listFiles('625db502720c8f52312c');
      setImageList(allimages.files);
      console.log(allimages.files);
      // console.log(await storage.listFiles('625db502720c8f52312c'));
    } catch (error) {
      console.log(error);
      alert("Servvver error, try again later")
    }
  };

  //Runs every time the page reloads
  useEffect(() => {
    fetchUser();
    getImage();
  }, []);

  //* Upload image
  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const newImage = await storage.createFile('625db502720c8f52312c', 'unique()', image);
      console.log(newImage);
      getImage();
    } catch (error) {
      console.log(error);
      alert("Server error, try again later")
    }
  }

  //* Logout
  const handlelogout = async (e) => {
    e.preventDefault();

    try {

      await account.deleteSessions();
      alert("Logged you out ")
      navigate("/");

    } catch (error) {
      console.log(error);
      alert("Please try again later, server is having issues !! ")
    }

  };

  //Delete the image
  const deleteImage = async (e, imageId) => {
    e.preventDefault();

    try {
      await storage.deleteFile(imageId);
      alert("Image Deleted Successfully");
    } catch (error) {
      alert(`${error.message}`);
    }
  };

  //Download image
  const downloadImage = (e, imageId) => {
    e.preventDefault();

    console.log(imageId);

    try {
      const downloadLink = storage.getFileDownload(imageId);

      window.open(downloadLink.href);
    } catch (error) {
      console.log(`${error.message}`);
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

          <input
            onChange={(e) => {
              setimage(e.target.files[0]);
            }}
            type="file"

            id="exampleFormControlFile1"
          />

          <button className='btn btn-warning' onClick={(e) => { handleUpload(e) }}>Upload</button>
        </div>
      </div>

      <div className="container uploadparent2">

        <h2>Here's some of the finest wallpapers !! </h2>

        <div className="container-fluid uploadparent2_imgparent2">

          {
            imageList.map((img) => {
              return (
                <img src={storage.getFilePreview('625db502720c8f52312c', `${img.$id}`)} alt="" srcset="" />

              );
            })}


        </div>
      </div>


    </>
  )
}

export default Home
