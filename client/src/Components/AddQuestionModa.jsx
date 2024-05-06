import React, { useEffect, useState } from "react";
import "../styles/AddFileModal.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { createFile } from "../redux/fileSlice/fileSlice";
import { createLesson } from "../redux/lessonSlice/lessonSlice";
import { createQuestion } from "../redux/QuizzSlice/questionSlice";

const AddQuestionModa = ({ reloadPage, setReloadPage, e }) => {
  const dispatch = useDispatch();

  const [show, setshow] = useState(false);
  const [question, setquestion] = useState({
    quizz_id: "",
    titre: "",
    time: 0,
  });
  useEffect(() => {
    setquestion((prevquestion) => ({
      ...prevquestion,
      quizz_id: e?._id,
    }));
  }, [e?._id]);
  const handleAddQuestion = () => {
    dispatch(createQuestion(question));
    setReloadPage(!reloadPage);
    setshow(false);
  };
  return (
    <>
      <button id="showbUtton" onClick={() => setshow(true)}>
        Add Question
      </button>
      {show && (
        <div className="create-File-modal">
          <div className="create-File-modal-container">
            <div className="create-File-modal-content">
              <div className="c-File-m-title">
                <div className="modale-title">
                  <h2>Add Question Form</h2>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-x-lg"
                  viewBox="0 0 16 16"
                  onClick={() => setshow(false)}
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
                <button className="File-close" onClick={() => setshow(false)}>
                  Close
                </button>
                <button className="File-submit" onClick={handleAddQuestion}>
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

export default AddQuestionModa;
