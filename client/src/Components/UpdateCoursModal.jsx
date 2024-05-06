import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatCours } from '../redux/coursSlice/coursSlice';

const UpdateCoursModal = ({ el,setUpdatecoursId, setopenUpdateModale, reloadPage, setReloadPage }) => {
    const [newCours, setNewCours] = useState({
        titre: el?.titre || '', // Set default value for name
        description: el?.description || '', // Set default value for starting date
      });
      const [coursImage, setCoursImage] = useState(el?.cours_image || ''); // Initialize cours_image separately
      const [file, setFile] = useState(null);
      const dispatch = useDispatch();
      const [titreError, setTitreError] = useState("");
      const [descriptionError, setDescriptionError] = useState("");

      const handleChange = (e) => {
        setNewCours({ ...newCours, [e.target.name]: e.target.value });
      };
      const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setCoursImage(URL.createObjectURL(e.target.files[0])); // Update coursImage state with the URL
      };
      

      const uploadCoursImage = async () => {
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
          if (!newCours.titre ) {
            setTitreError("Title is required");
            return;
          } else {
            setTitreError("");
          }
    
          if (!newCours.description) {
            setDescriptionError("description is required");
            return;
          } else {
            setDescriptionError("");
          }
          let imageUrl = coursImage; // Default to existing cours_image
          if (file) {
            imageUrl = await uploadCoursImage(); // If a new file is selected, upload it and get the URL
          }
          if (imageUrl) {
            const coursData = { ...newCours, cours_image: imageUrl };
            dispatch(updatCours({ id: el._id, cours: coursData }));
            setReloadPage(prev => !prev);
            setopenUpdateModale(false);
          } else {
            console.error("Failed to upload image");
          }
        } catch (error) {
          console.error("Error submitting cours:", error);
          setTitreError("error");
        }
      };

    const users = useSelector((state) => state.user?.users);

    return (
    <>
      <div className="create-cours-modal">
      <div className="create-cours-modal-container">
        <div className="create-cours-modal-content">
          <div className="c-cours-m-title">
            <div className="modale-title">
              <h2>Update Courss Form</h2>
            </div>
            <svg onClick={() => setopenUpdateModale(false)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
            </svg>
          </div>
        
                <div className="description">
                <select className='c-c-m-instr' name="instructor_id" onChange={handleChange} defaultValue={el.instructor_id}>
  <option value="">--Please choose an instructor--</option>
  {users?.filter((el)=>el?.role == "Instructor").map((user) => (
    <option key={user._id} value={user._id}>
      {user.nom} {user.prenom}
    </option>
  ))}
</select>


                        </div>
          <div className="cours-modal-content">
            <h3>Name : <label style={{ color: "red", fontSize: "13px" }}>{titreError}</label></h3>
            <input defaultValue={newCours?.titre} onChange={handleChange} name="titre" className="cours-modale-name" type="text" placeholder="Name" />
            <h3>Descrition :  <label style={{ color: "red", fontSize: "13px" }}>{descriptionError}</label> </h3>
            <input defaultValue={newCours?.description} onChange={handleChange} type="text" name="description" />
            <input type="file" onChange={handleFileChange} /> <br />
          </div>
          <div className="cours-modal-button">
            <button className="cours-close" onClick={() => setopenUpdateModale(false)}>Close</button>
            <button className="cours-submit" onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default UpdateCoursModal