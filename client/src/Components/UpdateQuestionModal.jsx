import React, { useEffect, useState } from "react";
import "../styles/UpdateQusetionModal.css";
import { updateQuizz } from "../redux/QuizzSlice/quizzSlice";
import { useDispatch } from "react-redux";
import { updateQuestion } from "../redux/QuizzSlice/questionSlice";

const UpdateQuestionModal = ({ qu, reloadPage, setReloadPage }) => {
  const dispatch = useDispatch();

  const [show, setshow] = useState(false);
  const [question, setquestion] = useState({});

  const handleSubmit = () => {
    dispatch(updateQuestion({ id: qu?._id, question: question }));
    setReloadPage(!reloadPage);
    setshow(false);
  };

  const handleClose = () => {
    setshow(false);
  };

  return (
    <>
      <button className="updatebutton" onClick={() => setshow(!show)}>
        Update
      </button>
      {show && (
        <div className="create-Update_question-modal">
          <div className="create-Update_question-modal-container">
            <div className="create-Update_question-modal-content">
              <div className="c-File-m-title">
                <div className="modale-title">
                  <h2>Upate Question Form</h2>
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
                <h3>Title : </h3>
                <input
                  type="text"
                  name="titre"
                  onChange={(e) =>
                    setquestion((prevquestion) => ({
                      ...prevquestion,
                      titre: e.target.value,
                    }))
                  }
                />
                <h3>Time : </h3>
                <input
                  type="number"
                  name="time"
                  onChange={(e) =>
                    setquestion((prevquestion) => ({
                      ...prevquestion,
                      time: e.target.value,
                    }))
                  }
                />
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

export default UpdateQuestionModal;
