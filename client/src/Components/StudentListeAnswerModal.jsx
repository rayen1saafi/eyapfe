import React, { useState } from "react";
import "../styles/StudentListeAnswerModal.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export const StudentListeAnswerModal = ({ e, setReloadPage, reloadPage }) => {
  const [show, setshow] = useState(false);
  const questions = useSelector((state) => state?.question?.questions);
  const answersStudent = useSelector(
    (state) => state?.answerstudent.answerstudent
  );
  const users = useSelector((state) => state.user?.users);

  return (
    <>
      <button className="buttonStudent" onClick={() => setshow(!show)}>
        Student List{" "}
      </button>
      {show && (
        <>
          <div className="student_list">
            <div className="list">
              {questions?.map((qu, index) => {
                if (qu?.quizz_id === e?._id && index === 0) {
                  return (
                    <>
                      {answersStudent
                        ?.filter((an) => an.question_id == qu._id)
                        .map((an) => (
                          <>
                            {users
                              ?.filter((us) => us?._id == an?.user_id)
                              .map((us) => (
                                <div className="student">
                                  <div className="contentstudent">
                                    <div className="img">
                                      <img src={us.user_img} alt="" />
                                    </div>
                                    <div className="text">
                                      <p>
                                        {us.nom} {us.prenom}
                                      </p>
                                      <p style={{ color: "gray" }}>
                                        {us.username}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="contstudent">
                                    <Link
                                      to={`/quizzresult/${us?._id}/${e?._id}`}
                                    >
                                      <button
                                        onClick={() =>
                                          setReloadPage(!reloadPage)
                                        }
                                      >
                                        View Result
                                      </button>
                                    </Link>
                                  </div>
                                </div>
                              ))}
                          </>
                        ))}
                    </>
                  );
                }
                return null; // Return null for questions that don't match the condition or aren't the first one
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
};
