import React from "react";
import "../styles/Quizz.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";

const QuizzResult = ({ setReloadPage, reloadPage }) => {
  const { user_id } = useParams();
  const { quizz_id } = useParams();
  const quizz = useSelector((state) => state?.quizz?.quizz);
  const questions = useSelector((state) => state?.question?.questions);
  const answers = useSelector((state) => state?.answer?.answers);
  const answersStudent = useSelector(
    (state) => state?.answerstudent.answerstudent
  );
  const users = useSelector((state) => state.user?.users);

  const questionLength = questions?.filter(
    (e) => e.quizz_id === quizz_id
  ).length;
  const [score, setScore] = useState(0);
  useEffect(() => {
    let newScore = 0;
    questions
      ?.filter((qu) => qu?.quizz_id === quizz_id)
      .forEach((qu) => {
        const studentAnswer = answersStudent?.find(
          (ans) => ans?.question_id === qu._id && ans?.user_id === user_id
        );
        if (studentAnswer) {
          const correctAnswer = answers.find(
            (an) => an?.question_id === qu._id && an?.isValidate
          );
          if (correctAnswer && studentAnswer.answer_id === correctAnswer._id) {
            newScore++;
          }
        }
      });
    setScore(newScore);
  }, [quizz_id, user_id, questions, answersStudent, answers]);
  const user = useSelector((state) => state?.user?.user);

  return (
    <>
      {Array.isArray(quizz) ? (
        quizz
          ?.filter((e) => e?._id == quizz_id)
          .map((e, index) => (
            <div className="quizz">
              <div className="questionNumber">
                {user?.role != "user" && (
                  <div className="number">
                    <p>
                      Student :{" "}
                      <>
                        {users
                          ?.filter((us) => us?._id == user_id)
                          .map((us) => (
                            <>
                              {us.prenom} {us.nom}
                            </>
                          ))}
                      </>
                    </p>
                  </div>
                )}

                <div className="number">
                  <p>
                    score:{score} /{questionLength}
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
                        </div>

                        <div class="radio-input-wrapper">
                          <>
                            {Array.isArray(answers) ? (
                              <>
                                {answers
                                  ?.filter((an) => an?.question_id == qu?._id)
                                  .map((an, i) => (
                                    <div className="rep">
                                      <label
                                        className="label"
                                        id={
                                          (an.isValidate == true &&
                                            answersStudent?.filter(
                                              (e) =>
                                                e.answer_id == an._id &&
                                                user_id == e.user_id
                                            ).length > 0) ||
                                          an.isValidate == true
                                            ? "labelgreen"
                                            : an.isValidate == false &&
                                              answersStudent?.filter(
                                                (e) =>
                                                  e.answer_id == an._id &&
                                                  user_id == e.user_id
                                              ).length > 0
                                            ? "labelred"
                                            : "labelwhite"
                                        }
                                      >
                                        <div class="radio-design"></div>
                                        <div class="label-text">{an.titre}</div>
                                      </label>
                                      <>
                                        {(an.isValidate == true &&
                                          answersStudent?.filter(
                                            (e) =>
                                              e.answer_id == an._id &&
                                              user_id == e.user_id
                                          ).length > 0) ||
                                        an.isValidate == true ? (
                                          <></>
                                        ) : an.isValidate == false &&
                                          answersStudent?.filter(
                                            (e) =>
                                              e.answer_id == an._id &&
                                              user_id == e.user_id
                                          ).length > 0 ? (
                                          <></>
                                        ) : null}
                                      </>
                                    </div>
                                  ))}
                                <>
                                  {answersStudent
                                    ?.filter(
                                      (e) =>
                                        e.answer_id == "" &&
                                        e.question_id == qu._id &&
                                        e.answer_id == ""
                                    )
                                    .map((e) => (
                                      <p
                                        style={{
                                          fontSize: "20px",
                                          color: "red",
                                        }}
                                      >
                                        No answer to this question
                                      </p>
                                    ))}
                                </>
                              </>
                            ) : (
                              <></>
                            )}
                          </>

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
            </div>
          ))
      ) : (
        <p>No quizzes available</p>
      )}
    </>
  );
};

export default QuizzResult;
