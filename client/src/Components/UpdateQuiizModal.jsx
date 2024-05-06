import React, { useState } from "react";
import "../styles/UpdateQuiizModal.css";
import { updateQuizz } from "../redux/QuizzSlice/quizzSlice";
import { useDispatch } from "react-redux";

const UpdateQuiizModal = ({ e, reloadPage, setReloadPage }) => {
  const [show, setShow] = useState(false);
  const [quizz, setQuizz] = useState({});
  const dispatch = useDispatch();

  const handleTitleChange = (e) => {
    setQuizz({ ...quizz, titre: e.target.value });
  };

  const handleEtatChange = (e) => {
    const newEtate = e.target.value === "true";
    setQuizz({ ...quizz, etat: newEtate });
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleSubmit = () => {
    dispatch(updateQuizz({ id: e?._id, quizz: quizz }));
    setReloadPage(!reloadPage);
    setShow(false); // Closing the modal after submission
  };

  return (
    <>
      <button className="updatebutton" onClick={() => setShow(!show)}>
        Update
      </button>
      {show && (
        <div className="create-Update_quizz-modal">
          <div className="create-Update_quizz-modal-container">
            <div className="create-Update_quizz-modal-content">
              <div className="c-File-m-title">
                <div className="modale-title">
                  <h2>Add File Form</h2>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-x-lg"
                  viewBox="0 0 16 16"
                  onClick={handleClose}
                >
                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                </svg>
              </div>
              <div className="File-modal-content">
                <h3>Title :</h3>
                <input type="text" name="title" onChange={handleTitleChange} />
                <h3>State:</h3>
                <select onChange={handleEtatChange}>
                  <option value="">select</option>

                  <option value="false">False</option>
                  <option value="true">True</option>
                </select>
              </div>
              <div className="File-modal-button">
                <button className="File-close" onClick={handleClose}>
                  Close
                </button>
                <button className="File-submit" onClick={handleSubmit}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateQuiizModal;
