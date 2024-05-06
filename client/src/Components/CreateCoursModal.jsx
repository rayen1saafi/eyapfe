import React, { useState } from 'react';
import '../styles/create-c-modal.css';
import { useDispatch, useSelector } from 'react-redux';
import { createCours } from '../redux/coursSlice/coursSlice';
import axios from "axios";
import { useParams } from 'react-router-dom';

const CreateCoursModal = ({setopenCourModale, reloadPage, setReloadPage}) => {
    const [newCours, setNewCours] = useState({});
    const [file, setFile] = useState(null);
    const [titreError, setTitreError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const [coursimageError, setcoursimageError] = useState("");
    const {id} = useParams();
    const dispatch = useDispatch();
    const users = useSelector((state) => state.user?.users);

    const handleChange = (e) => {
        if (e.target.name === "instructor_id") {
            setNewCours({ ...newCours, instructor_id: e.target.value });
        } else {
            setNewCours({ ...newCours, [e.target.name]: e.target.value });
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
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
        // Validation checks
        if (newCours.titre == "" || newCours.titre?.length == null) {
            setTitreError("Title is empty");
        } else {
            setTitreError("");
        }

        if (newCours?.description == "" || newCours.description?.length == null) {
            setDescriptionError("Description is empty");
        } else {
            setDescriptionError("");
        }

        if (file == "" || file == null) {
            setcoursimageError("Image is required");
        } else {
            setcoursimageError("");
        }

        if (newCours.titre?.length >= 1 && newCours.description?.length >= 1 && newCours.instructor_id) {
            try {
                const imageUrl = await uploadCoursImage();
                if (imageUrl) {
                    const coursData = { ...newCours, cours_image: imageUrl };
                    dispatch(createCours({
                        ...coursData,
                        formateur_id: "123",
                        quiz_id: "123",
                        apprenants_liste: ["fatma", "ameni"],
                        pack_id: id
                    }
                ),
                     setopenCourModale(false));
                     setTimeout(() => {
                        setReloadPage(!reloadPage)

                     }, 1000);
                } else {
                    console.error("Failed to upload image");
                }
            } catch (error) {
                console.error("Error submitting cours:", error);
                setTitreError("Error");
            }
        }
    };

    return (
        <div className="create-cours-modal">
            <div className="create-cours-modal-container">
                <div className="create-cours-modal-content">
                    <div className="c-cours-m-title">
                        <div className="modale-title">
                            <h2>Cours Form</h2>
                        </div>
                        <svg onClick={() => !setopenCourModale(false)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                        </svg>
                    </div>
                    <div className="cours-modal-content">
                        <h3>Choose Instructor:</h3>
                        <select className='c-c-m-instr' name="instructor_id" onChange={handleChange}>
                            <option value="">--Please choose an instructor--</option>
                            {users?.filter((el) => el?.role === "Instructor").map((user) =>
                                <option key={user._id} value={user._id}>{user.nom} {user.prenom}</option>
                            )}
                        </select>
                        <h3>Title:</h3>
                        <input onChange={handleChange} name="titre" className='cours-modale-name' type="text" placeholder='Name' />
                        <h3>Description:</h3>
                        <input onChange={handleChange} className='c-c-m-desc' name="description" />
                        <input type="file" onChange={handleFileChange} required /> <br />
                        <label style={{ color: "red", fontSize: "13px" }}>{coursimageError}</label>
                    </div>
                    <div className="cours-modal-button">
                        <button className='cours-close' onClick={() => setopenCourModale(false)}>Close</button>
                        <button className='cours-submit' onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateCoursModal;
