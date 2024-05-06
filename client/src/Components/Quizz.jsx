import React, { useState } from "react";
import "../styles/CoursesDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deletQuizz } from "../redux/QuizzSlice/quizzSlice";

import { deleteAnswerByQuizz } from "../redux/QuizzSlice/answerSlice";
import { deletQuestionbyquizz } from "../redux/QuizzSlice/questionSlice";
import { deletAnswerstudentbyquizz } from "../redux/QuizzSlice/answerStudentSlice";
import UpdateQuiizModal from "./UpdateQuiizModal";

const Quizz = ({ el, reloadPage, setReloadPage }) => {
  const dispatch = useDispatch();

  const [showlessons, setshowlessons] = useState(false);
  const quizz = useSelector((state) => state?.quizz?.quizz);
  const cours = useSelector((state) => state?.cours?.cours);
  const pack = useSelector((state) => state.pack?.pack);
  var student;
  const user = useSelector((state) => state?.user?.user);

  return (
    <>
      <div className="lesson_titre">
        <p>Quizz</p>
        {showlessons ? (
          <svg
            onClick={() => setshowlessons(!showlessons)}
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            class="bi bi-caret-down-fill"
            viewBox="0 0 16 16"
          >
            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
          </svg>
        ) : (
          <svg
            onClick={() => setshowlessons(!showlessons)}
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            class="bi bi-caret-up-fill"
            viewBox="0 0 16 16"
          >
            <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
          </svg>
        )}
      </div>
      <div className={showlessons ? "lessonContent1" : "lessonContent"}>
        {Array.isArray(quizz) ? (
          quizz
            ?.filter((e) => e.course_id == el._id)
            .map((e, index) => (
              <>
                {user?.role == "user" && e.etat == true ? (
                  <>
                    <div key={index} className="cont">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-question-circle"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                        <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286m1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94" />
                      </svg>
                      <p>{e.titre}</p>
                      <span className="span">20 Minutes</span>
                      <span className="span">5 questions</span>

                      <span className="span1" style={{ color: "red" }}>
                        {e.etat == false && <>This quiz is not activated</>}
                      </span>

                      <div className="buttons">
                        {cours
                          ?.filter((cour) => cour._id === e.course_id)
                          .map((cour) => (
                            <>
                              {pack
                                ?.filter((pa) => pa._id === cour.pack_id)
                                .map((pa) => {
                                  student = (pa?.student).findIndex(
                                    (el) => el === user?._id
                                  );
                                  if (student >= 0) {
                                    return (
                                      <>
                                        <Link to={`/quizzStudent/${e?._id}`}>
                                          <button className="button1">
                                            View
                                          </button>
                                        </Link>
                                      </>
                                    );
                                  } else {
                                    return null;
                                  }
                                })}
                            </>
                          ))}

                        {el?.instructor_id == user?._id && (
                          <>
                            <UpdateQuiizModal
                              e={e}
                              setReloadPage={setReloadPage}
                              reloadPage={reloadPage}
                            />
                            <button
                              className="button2"
                              onClick={() => {
                                const confirmed = window.confirm(
                                  "Are you sure you want to delete this quizz?"
                                );
                                if (confirmed) {
                                  dispatch(deletQuestionbyquizz(e?._id));
                                  dispatch(deletQuizz({ id: e?._id }));

                                  dispatch(deleteAnswerByQuizz(e?._id));
                                  dispatch(deletAnswerstudentbyquizz(e?._id));

                                  setReloadPage(!reloadPage);
                                }
                              }}
                            >
                              Delete
                            </button>
                            <Link to={`/quizzInstractor/${e?._id}`}>
                              <button
                                className="button1"
                                onClick={() => setReloadPage(!reloadPage)}
                              >
                                View
                              </button>
                            </Link>
                          </>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  user?.role == "Instructor" && (
                    <>
                      <div key={index} className="cont">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-question-circle"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                          <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286m1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94" />
                        </svg>
                        <p>{e.titre}</p>
                        <span className="span">20 Minutes</span>
                        <span className="span">5 questions</span>

                        <span className="span1" style={{ color: "red" }}>
                          {e.etat == false && <>This quiz is not activated</>}
                        </span>

                        <div className="buttons">
                          {cours
                            ?.filter((cour) => cour._id === e.course_id)
                            .map((cour) => (
                              <>
                                {pack
                                  ?.filter((pa) => pa._id === cour.pack_id)
                                  .map((pa) => {
                                    student = (pa?.student).findIndex(
                                      (el) => el === user?._id
                                    );
                                    if (student >= 0) {
                                      return (
                                        <>
                                          <Link to={`/quizzStudent/${e?._id}`}>
                                            <button className="button1">
                                              View
                                            </button>
                                          </Link>
                                        </>
                                      );
                                    } else {
                                      return null;
                                    }
                                  })}
                              </>
                            ))}

                          {el?.instructor_id == user?._id && (
                            <>
                              <UpdateQuiizModal
                                e={e}
                                setReloadPage={setReloadPage}
                                reloadPage={reloadPage}
                              />
                              <button
                                className="button2"
                                onClick={() => {
                                  const confirmed = window.confirm(
                                    "Are you sure you want to delete this quizz?"
                                  );
                                  if (confirmed) {
                                    dispatch(deletQuestionbyquizz(e?._id));
                                    dispatch(deletQuizz({ id: e?._id }));

                                    dispatch(deleteAnswerByQuizz(e?._id));
                                    dispatch(deletAnswerstudentbyquizz(e?._id));

                                    setReloadPage(!reloadPage);
                                  }
                                }}
                              >
                                Delete
                              </button>
                              <Link to={`/quizzInstractor/${e?._id}`}>
                                <button
                                  className="button1"
                                  onClick={() => setReloadPage(!reloadPage)}
                                >
                                  View
                                </button>
                              </Link>
                            </>
                          )}
                        </div>
                      </div>
                    </>
                  )
                )}
              </>
            ))
        ) : (
          <p>No quizzes available</p>
        )}
      </div>
    </>
  );
};

export default Quizz;
