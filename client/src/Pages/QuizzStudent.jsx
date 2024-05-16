import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Quizz.css";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createAnswerStudent } from "../redux/QuizzSlice/answerStudentSlice";

const QuizzStudent = ({ reloadPage, setReloadPage }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const quizz = useSelector((state) => state?.quizz?.quizz);
  const questions = useSelector((state) => state?.question?.questions);
  const answers = useSelector((state) => state?.answer?.answers);
  const user = useSelector((state) => state?.user?.user);
  const answersStudent = useSelector(
    (state) => state?.answerstudent.answerstudent
  );
  const questionLength = questions?.filter((e) => e.quizz_id === id).length;
  const answersStudentLength = answersStudent?.filter(
    (e) => e.quizz_id === id && e.user_id == user?._id
  ).length;
  console.log("answersStudent::::::::::", answersStudentLength, questionLength);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isValidateClicked, setIsValidateClicked] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isInputsDisabled, setIsInputsDisabled] = useState(false); // State to track whether inputs are disabled
  const [timeLeft, setTimeLeft] = useState(0); // State to track time left
  const [currentIndex, setCurrentIndex] = useState(0); // Track current question index
  const [an_id, setan_id] = useState("");

  const handleNextQuestion = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < questionLength) {
      setCurrentIndex(nextIndex);
      setIsAnswered(false);
      setIsValidateClicked(false);
      setSelectedAnswer(null);
      setIsInputsDisabled(false); // Enable inputs for the next question
      if (questions && questions[nextIndex] && questions[nextIndex].time) {
        setTimeLeft(questions[nextIndex].time); // Set time from next question's time property
      }
    } else {
      // If no more questions, handle end of quiz
      handleEndOfQuiz();
    }
  };

  const handleEndOfQuiz = () => {
    // Dispatch empty answer ID if time is up and no answer is selected
    if (!isAnswered) {
      dispatch(
        createAnswerStudent({
          quizz_id: id,
          user_id: user?._id,
          question_id: questions[currentIndex]?._id,
          answer_id: "", // Empty answer ID
        })
      );
    }
  };

  useEffect(() => {
    // Handle end of quiz when all questions are answered
    if (currentIndex === questionLength) {
      handleEndOfQuiz();
    }
  }, [currentIndex, questionLength]);

  useEffect(() => {
    // Set initial time when component mounts
    if (questions && questions[currentIndex] && questions[currentIndex].time) {
      setTimeLeft(questions[currentIndex].time); // Set time from question's time property
    }
  }, [questions, currentIndex]);

  useEffect(() => {
    // Countdown timer effect
    if (timeLeft >= 0) {
      const timer = setTimeout(() => {
        if (answersStudentLength != questionLength) {
          setTimeLeft((prevTime) => prevTime - 1);
        }
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      toast.error("Time's up! You haven't confirmed your answer.");

      if (!isAnswered) {
        handleEndOfQuiz();
        // setTimeout(() => {
        //   handleNextQuestion(); // Proceed to the next question
        // }, 2000); // Delay for 2 seconds before proceeding to the next question
        // Display toast message for time's up
      }
    }
  }, [timeLeft, isAnswered]);

  const handleValidate = () => {
    const radioInputs = document.getElementsByName("value-radio");
    const checkedInput = Array.from(radioInputs).find((input) => input.checked);

    if (checkedInput) {
      setIsAnswered(true);
      setIsValidateClicked(true);
      setSelectedAnswer(checkedInput.value);
      setIsInputsDisabled(true); // Disable inputs after validation
    } else {
      // Display error message with toast
      toast.error("Please select an answer before validating.");
    }
  };

  return (
    <>
      {answersStudentLength == questionLength ? (
        <div className="quizz">
          <ToastContainer />

          {Array.isArray(quizz) &&
            quizz
              ?.filter((e) => e?._id == id)
              .map((e, index) => (
                <div className="quizz" key={index}>
                  {answersStudentLength < questionLength ? (
                    <>
                      <div className="allquizz">
                        <div className="quizz">
                          <div className="questionNumber"></div>
                          {Array.isArray(questions) &&
                            questions
                              ?.filter((qu) => qu?.quizz_id === e?._id)
                              .map(
                                (qu, qIndex) =>
                                  qIndex === currentIndex && (
                                    <React.Fragment key={qIndex}>
                                      <div className="questionNumber">
                                        <div className="divNumber">
                                          {[...Array(questionLength)].map(
                                            (_, step) => (
                                              <div
                                                className={
                                                  step <= qIndex
                                                    ? "cc"
                                                    : "content"
                                                }
                                                style={{
                                                  width: `${
                                                    100 / questionLength - 1
                                                  }%`,
                                                }}
                                                key={step}
                                              ></div>
                                            )
                                          )}
                                        </div>
                                        <div className="number">
                                          <p>
                                            QUESTION {qIndex + 1}/
                                            {questionLength} :{" "}
                                            {timeLeft > 0 && (
                                              <>{timeLeft}seconds</>
                                            )}
                                            {timeLeft <= 0 && <>0 seconds</>}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="questionTitre">
                                        <h1>{qu.titre}</h1>
                                      </div>

                                      <div className="radio-input-wrapper1">
                                        {Array.isArray(answers) &&
                                          answers
                                            ?.filter(
                                              (an) => an?.question_id == qu?._id
                                            )
                                            .map((an) => (
                                              <div className="rep" key={an._id}>
                                                <label
                                                  className="label"
                                                  style={{
                                                    backgroundColor:
                                                      isValidateClicked &&
                                                      selectedAnswer ===
                                                        an._id &&
                                                      an.isValidate
                                                        ? "green"
                                                        : isValidateClicked &&
                                                          selectedAnswer ===
                                                            an._id
                                                        ? "red"
                                                        : "",
                                                  }}
                                                >
                                                  <input
                                                    value={an._id}
                                                    name="value-radio"
                                                    id={an._id}
                                                    className="radio-input"
                                                    type="radio"
                                                    disabled={isInputsDisabled} // Disable inputs if isInputsDisabled is true
                                                    onChange={() =>
                                                      setSelectedAnswer(an._id)
                                                    }
                                                    onClick={() =>
                                                      setan_id(an?._id)
                                                    }
                                                  />
                                                  <div className="radio-design"></div>
                                                  <div className="label-text">
                                                    {an.titre}
                                                  </div>
                                                </label>
                                              </div>
                                            ))}
                                      </div>
                                      <div className="quizzbutton">
                                        {isAnswered || timeLeft <= 0 ? (
                                          <>
                                            {currentIndex <
                                            questionLength - 1 ? (
                                              <button
                                                onClick={handleNextQuestion}
                                              >
                                                Next QUESTION
                                              </button>
                                            ) : (
                                              <Link
                                                to={`/quizzresult/${user?._id}/${e?._id}`}
                                              >
                                                <button
                                                  onClick={() =>
                                                    setReloadPage(!reloadPage)
                                                  }
                                                >
                                                  View Result
                                                </button>
                                              </Link>
                                            )}
                                          </>
                                        ) : (
                                          <>
                                            <button
                                              onClick={() => {
                                                handleValidate();
                                                dispatch(
                                                  createAnswerStudent({
                                                    quizz_id: id,
                                                    user_id: user?._id,
                                                    question_id: qu?._id,
                                                    answer_id: an_id,
                                                  })
                                                );
                                              }}
                                            >
                                              Validate
                                            </button>
                                            {timeLeft <= 0 && (
                                              <button
                                                onClick={handleNextQuestion}
                                              >
                                                Next QUESTION
                                              </button>
                                            )}
                                          </>
                                        )}
                                      </div>
                                    </React.Fragment>
                                  )
                              )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="msgquizz">
                        <p>You have finished answering all the questions</p>
                        <Link to={`/quizzresult/${user?._id}/${e?._id}`}>
                          <button onClick={() => setReloadPage(!reloadPage)}>
                            View Result
                          </button>
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              ))}
          {!Array.isArray(quizz) && <p>No quizzes available</p>}
        </div>
      ) : (
        <div className="quizz">
          <ToastContainer />

          {Array.isArray(quizz) &&
            quizz
              ?.filter((e) => e?._id == id)
              .map((e, index) => (
                <div className="quizz" key={index}>
                  <div className="allquizz">
                    <div className="quizz1">
                      <div className="questionNumber"></div>
                      {Array.isArray(questions) &&
                        questions
                          ?.filter((qu) => qu?.quizz_id === e?._id)
                          .map(
                            (qu, qIndex) =>
                              qIndex === currentIndex && (
                                <React.Fragment key={qIndex}>
                                  <div className="questionNumber">
                                    <div className="divNumber">
                                      {[...Array(questionLength)].map(
                                        (_, step) => (
                                          <div
                                            className={
                                              step <= qIndex ? "cc" : "content"
                                            }
                                            style={{
                                              width: `${
                                                100 / questionLength - 1
                                              }%`,
                                            }}
                                            key={step}
                                          ></div>
                                        )
                                      )}
                                    </div>
                                    <div className="number">
                                      <p>
                                        QUESTION {qIndex + 1}/{questionLength} :{" "}
                                        {timeLeft > 0 && <>{timeLeft}seconds</>}
                                        {timeLeft <= 0 && <>0 seconds</>}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="questionTitre">
                                    <h1>{qu.titre}</h1>
                                  </div>

                                  <div className="radio-input-wrapper1">
                                    {Array.isArray(answers) &&
                                      answers
                                        ?.filter(
                                          (an) => an?.question_id == qu?._id
                                        )
                                        .map((an) => (
                                          <div className="rep" key={an._id}>
                                            <label
                                              className="label"
                                              style={{
                                                backgroundColor:
                                                  isValidateClicked &&
                                                  selectedAnswer === an._id &&
                                                  an.isValidate
                                                    ? "green"
                                                    : isValidateClicked &&
                                                      selectedAnswer === an._id
                                                    ? "red"
                                                    : "",
                                              }}
                                            >
                                              <input
                                                value={an._id}
                                                name="value-radio"
                                                id={an._id}
                                                className="radio-input"
                                                type="radio"
                                                disabled={isInputsDisabled} // Disable inputs if isInputsDisabled is true
                                                onChange={() =>
                                                  setSelectedAnswer(an._id)
                                                }
                                                onClick={() =>
                                                  setan_id(an?._id)
                                                }
                                              />
                                              <div className="radio-design"></div>
                                              <div className="label-text">
                                                {an.titre}
                                              </div>
                                            </label>
                                          </div>
                                        ))}
                                  </div>
                                  <div className="quizzbutton">
                                    {isAnswered || timeLeft <= 0 ? (
                                      <>
                                        {currentIndex < questionLength - 1 ? (
                                          <button onClick={handleNextQuestion}>
                                            Next QUESTION
                                          </button>
                                        ) : (
                                          <Link
                                            to={`/quizzresult/${user?._id}/${e?._id}`}
                                          >
                                            <button
                                              onClick={() =>
                                                setReloadPage(!reloadPage)
                                              }
                                            >
                                              View Result
                                            </button>
                                          </Link>
                                        )}
                                      </>
                                    ) : (
                                      <>
                                        <button
                                          onClick={() => {
                                            handleValidate();
                                            dispatch(
                                              createAnswerStudent({
                                                quizz_id: id,
                                                user_id: user?._id,
                                                question_id: qu?._id,
                                                answer_id: an_id,
                                              })
                                            );
                                          }}
                                        >
                                          Validate
                                        </button>
                                        {timeLeft <= 0 && (
                                          <button onClick={handleNextQuestion}>
                                            Next QUESTION
                                          </button>
                                        )}
                                      </>
                                    )}
                                  </div>
                                </React.Fragment>
                              )
                          )}
                    </div>
                  </div>
                </div>
              ))}
          {!Array.isArray(quizz) && <p>No quizzes available</p>}
        </div>
      )}
    </>
  );
};

export default QuizzStudent;
