import React from "react";
import "../styles/Quizz.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AddQuestionModa from "../Components/AddQuestionModa";
import AddAnwserModal from "../Components/AddanwserModal";
import { StudentListeAnswerModal } from "../Components/StudentListeAnswerModal";
import { deletQuestion } from "../redux/QuizzSlice/questionSlice";
import { deleteAnswer } from "../redux/QuizzSlice/answerSlice";
import UpdateQuestionModal from "../Components/UpdateQuestionModal";

const QuizzInstracotor = ({ setReloadPage, reloadPage }) => {
  const { id } = useParams();
  const quizz = useSelector((state) => state?.quizz?.quizz);
  const questions = useSelector((state) => state?.question?.questions);
  const answers = useSelector((state) => state?.answer?.answers);
  const questionLength = questions?.filter((e) => e.quizz_id === id).length;
  const dispatch = useDispatch();

  return (
    <>
      {Array.isArray(quizz) ? (
        quizz
          ?.filter((e) => e?._id == id)
          .map((e, index) => (
            <div className="quizz">
              <div className="questionNumber">
                <StudentListeAnswerModal
                  e={e}
                  reloadPage={reloadPage}
                  setReloadPage={setReloadPage}
                />

                <div className="number">
                  <p>
                    {e.titre} : {questionLength} QUESTION{" "}
                  </p>
                </div>
              </div>
              {Array.isArray(questions) ? (
                <>
                  {questions
                    ?.filter((qu) => qu?.quizz_id == e?._id)
                    .map((qu) => (
                      <>
                        <div className="questionTitre">
                          <h1>{qu.titre}</h1>
                          <div className="action">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="45"
                              height="45"
                              class="bi bi-trash3-fill"
                              viewBox="0 0 16 16"
                              className="svg1"
                              onClick={() => {
                                const confirmed = window.confirm(
                                  "Are you sure you want to delete this question?"
                                );
                                if (confirmed) {
                                  dispatch(deletQuestion({ id: qu?._id }));
                                  setReloadPage(!reloadPage);
                                }
                              }}
                            >
                              <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                            </svg>
                            <UpdateQuestionModal qu={qu} setReloadPage={setReloadPage} reloadPage={reloadPage} />
                          </div>
                        </div>

                        <div class="radio-input-wrapper">
                          {Array.isArray(answers) ? (
                            <>
                              {answers
                                ?.filter((an) => an?.question_id == qu?._id)
                                .map((an) => (
                                  <div className="rep">
                                    <label
                                      className="label"
                                      id={
                                        an.isValidate == true
                                          ? "label2"
                                          : "label"
                                      }
                                    >
                                      {/* <input
                                        value="value-2"
                                        name="value-radio"
                                        id="value-2"
                                        class="radio-input"
                                        type="radio"
                                      /> */}
                                      <div class="radio-design"></div>
                                      <div class="label-text">{an.titre}</div>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        class="bi bi-trash3-fill"
                                        viewBox="0 0 16 16"
                                        className="svg2"
                                        onClick={() => {
                                          const confirmed = window.confirm(
                                            "Are you sure you want to delete this answer?"
                                          );
                                          if (confirmed) {
                                            dispatch(deleteAnswer(an?._id));
                                            setReloadPage(!reloadPage);
                                          }
                                        }}
                                      >
                                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                                      </svg>
                                    </label>
                                  </div>
                                ))}
                            </>
                          ) : (
                            <></>
                          )}
                          <AddAnwserModal
                            qu={qu}
                            setReloadPage={setReloadPage}
                            reloadPage={reloadPage}
                          />{" "}
                          <br />
                          <br />
                          <br />
                          <br />
                          <hr style={{ Color: "white" }} />
                        </div>
                      </>
                    ))}
                </>
              ) : (
                <></>
              )}

              <div>
                <AddQuestionModa
                  e={e}
                  setReloadPage={setReloadPage}
                  reloadPage={reloadPage}
                />
              </div>
            </div>
          ))
      ) : (
        <p>No quizzes available</p>
      )}
    </>
  );
};

export default QuizzInstracotor;
