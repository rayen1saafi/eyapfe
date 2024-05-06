import React, { useState } from 'react';
import "../styles/create-p-modal.css";
import { useDispatch } from "react-redux";
import { createPack } from '../redux/packSlice/packSlice';
import axios from "axios";

const CreatePackModal = ({openModale, setopenModale,reloadPage,setReloadPage }) => {

  const [newPack, setNewPack] = useState({});
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setNewPack({ ...newPack, [e.target.name]: e.target.value });
  };

// ------------------------ error message ----------------
const [nameError, setNameError] = useState("");
const [startingdateError, setstartingdateError] = useState("");
const [endingdateError, setendingdateError] = useState("");
const [packimageError, setpackimageError] = useState("");

//   -------------- upload image -------
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const uploadPackImage = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "fatmabouakazine");

      const response = await axios.post("https://api.cloudinary.com/v1_1/dpu5n0ocs/upload", formData);
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const handleSubmit = async () => {
    if (newPack.nom?.length == "" || newPack.nom?.length == null  ) {
      setNameError("name is empty");
    } else {
      setNameError("");
    }
    if (!newPack.dateDebut || !newPack.dateFin) {
      setendingdateError("Make sure both starting and ending dates are not empty");
    } else if (new Date(newPack.dateDebut) >= new Date(newPack.dateFin)) {
      setendingdateError("Make sure the ending date is greater than the starting date");
    } else {
      setendingdateError("");
    }
    
    if (!newPack.dateDebut || !newPack.dateFin) {
      setstartingdateError("Make sure both starting and ending dates are not empty");
    } else if (new Date(newPack.dateFin) <= new Date(newPack.dateDebut)) {
      setstartingdateError("Make sure the starting date is smaller than the ending date");
    } else {
      setstartingdateError("");
    }
    
    
    if (file == "" || file == null  ) {
      setpackimageError("image is required");
    } else {
      setpackimageError("");
    }
    // ------------------
    if (
      newPack.nom?.length >= 1 &&
      newPack.dateDebut !== null && 
      newPack.dateFin !== null && 
      newPack.dateDebut <= newPack.dateFin   
    )
    try {
      const imageUrl = await uploadPackImage();
      if (imageUrl) {
        const packData = { ...newPack, pack_image: imageUrl };
        dispatch(createPack(packData),
        setReloadPage(!reloadPage)
        );
        setopenModale(false);
      } else {
        console.error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error submitting pack:", error);
      setNameError("erroor");
    }

  };

  return (
    <>
      <div className="create-pack-modal">
        <div className="create-pack-modal-container">
          <div className="create-pack-modal-content">
            <div className="c-pack-m-title">
              <div className="modale-title">
                <h2>Packs Form</h2>
              </div>
              <svg onClick={() => setopenModale(false)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
              </svg>
            </div>
            <div className="pack-modal-content">
              <h3>Name : <label style={{ color: "red",fontSize:"13px" }}>{nameError}</label></h3>
              <input onChange={handleChange} name="nom" className='pack-modale-name' type="text" placeholder='Name' />
              <h3>Starting Date :  <label style={{ color: "red",fontSize:"13px" }}>{startingdateError}</label> </h3>
              <input onChange={handleChange} type="date" name="dateDebut" />
              <h3>Ending Date :  <label style={{ color: "red",fontSize:"13px" }}>{endingdateError}</label></h3>
              <input onChange={handleChange} type="date" name="dateFin" />
              <input type="file" onChange={handleFileChange} required /> <br />
              <label style={{ color: "red",fontSize:"13px" }}>{packimageError}</label>
            </div>
            <div className="pack-modal-button">
              <button className='pack-close' onClick={() => setopenModale(false)}>Close</button>
              <button className='pack-submit' onClick={handleSubmit}>Submit</button>
         
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePackModal;
