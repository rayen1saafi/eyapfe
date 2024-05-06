import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from "axios";
import { updatPack } from '../redux/packSlice/packSlice';

const UpdatePackModal = ({ el, setopenUpdateModale, reloadPage, setReloadPage }) => {
  const [newPack, setNewPack] = useState({
    nom: el?.nom || '', // Set default value for name
    dateDebut: el?.dateDebut || '', // Set default value for starting date
    dateFin: el?.dateFin || '', // Set default value for ending date
  });

  const [packImage, setPackImage] = useState(el?.pack_image || ''); // Initialize pack_image separately
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const [nameError, setNameError] = useState("");
  const [startingdateError, setStartingdateError] = useState("");
  const [endingdateError, setEndingdateError] = useState("");

  const handleChange = (e) => {
    setNewPack({ ...newPack, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    // When a new file is selected, update packImage state
    setPackImage(URL.createObjectURL(e.target.files[0]));
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
    try {
      if (!newPack.nom) {
        setNameError("Name is required");
        return;
      } else {
        setNameError("");
      }

      if (!newPack.dateDebut || !newPack.dateFin) {
        setStartingdateError("Starting and ending dates are required");
        setEndingdateError("Starting and ending dates are required");
        return;
      } else {
        setStartingdateError("");
        setEndingdateError("");
      }

      if (new Date(newPack.dateDebut) >= new Date(newPack.dateFin)) {
        setEndingdateError("Ending date must be after starting date");
        return;
      } else {
        setEndingdateError("");
      }

      let imageUrl = packImage; // Default to existing pack_image
      if (file) {
        imageUrl = await uploadPackImage(); // If a new file is selected, upload it and get the URL
      }
      if (imageUrl) {
        const packData = { ...newPack, pack_image: imageUrl };
        dispatch(updatPack({ id: el._id, pack: packData }));
        setReloadPage(prev => !prev);
        setopenUpdateModale(false);
      } else {
        console.error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error submitting pack:", error);
      setNameError("error");
    }
  };

  return (
    <div className="create-pack-modal">
      <div className="create-pack-modal-container">
        <div className="create-pack-modal-content">
          <div className="c-pack-m-title">
            <div className="modale-title">
              <h2>Update Packs Form</h2>
            </div>
            <svg onClick={() => setopenUpdateModale(false)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
            </svg>
          </div>
          <div className="pack-modal-content">
            <h3>Name : <label style={{ color: "red", fontSize: "13px" }}>{nameError}</label></h3>
            <input defaultValue={newPack.nom} onChange={handleChange} name="nom" className="pack-modale-name" type="text" placeholder="Name" />
            <h3>Starting Date :  <label style={{ color: "red", fontSize: "13px" }}>{startingdateError}</label> </h3>
            <input defaultValue={newPack.dateDebut} onChange={handleChange} type="date" name="dateDebut" />
            <h3>Ending Date :  <label style={{ color: "red", fontSize: "13px" }}>{endingdateError}</label></h3>
            <input defaultValue={newPack.dateFin} onChange={handleChange} type="date" name="dateFin" />
            <input type="file" onChange={handleFileChange} /> <br />
          </div>
          <div className="pack-modal-button">
            <button className="pack-close" onClick={() => setopenUpdateModale(false)}>Close</button>
            <button className="pack-submit" onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePackModal;
