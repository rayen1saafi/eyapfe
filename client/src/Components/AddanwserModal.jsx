import React, { useEffect, useState } from "react";
import "../styles/AddFileModal.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { createAnswer } from "../redux/QuizzSlice/answerSlice"; // Update import
import { createFile } from "../redux/fileSlice/fileSlice";
import { createLesson } from "../redux/lessonSlice/lessonSlice";

const AddAnwserModal = ({ reloadPage, setReloadPage, qu }) => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false); // Updated state name
  const [answer, setAnswer] = useState({
    // Updated state name
    quizz_id: qu?.quizz_id,
    question_id: qu?._id,
    titre: "",
    isValidate: false, // Updated key name
  });

  useEffect(() => {
    if (qu) {
      setAnswer((prevAnswer) => ({
        ...prevAnswer,
        isValidate: false, // Remove unnecessary optional chaining
      }));
    }
  }, [reloadPage]);

  const handleAddAnswer = () => {
    dispatch(createAnswer(answer));
    setReloadPage(!reloadPage);
    setShow(false);
  };

  return (
    <>
      <button id="showbUtton" onClick={() => setShow(true)}>
        Add Answer
      </button>
      {show && (
        <div className="create-File-modal">
          <div className="create-File-modal-container">
            <div className="create-File-modal-content">
              <div className="c-File-m-title">
                <div className="modal-title">
                  <h2>Add Anwser Form</h2>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-x-lg"
                  viewBox="0 0 16 16"
                  onClick={() => setShow(false)}
                >
                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                </svg>
              </div>
              <div className="File-modal-content">
                <h3>Title:</h3>
                <input
                  type="text"
                  name="titre"
                  onChange={(e) =>
                    setAnswer((prevAnswer) => ({
                      ...prevAnswer,
                      titre: e.target.value,
                    }))
                  }
                />
                <h3>Response status:</h3>
                <select
                  onChange={(e) =>
                    setAnswer((prevAnswer) => ({
                      ...prevAnswer,
                      isValidate: e.target.value === "true", // Corrected value assignment
                    }))
                  }
                >
                  <option value="false">false</option>
                  <option value="true">true</option>
                </select>
              </div>
              <div className="File-modal-button">
                <button className="File-close" onClick={() => setShow(false)}>
                  {" "}
                  {/* Updated function name */}
                  Close
                </button>
                <button className="File-submit" onClick={handleAddAnswer}>
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

export default AddAnwserModal;
