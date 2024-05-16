import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../styles/StudentListeAnswerModal.css";

export const StudentListeAnswerModal = ({ e, setReloadPage, reloadPage }) => {
  const [show, setShow] = useState(false);
  const questions = useSelector((state) => state?.question?.questions);
  const filteredQuestions = questions?.filter((qu) => qu.quizz_id === e._id);
  const questionLength = filteredQuestions?.length;
  const answersStudent = useSelector((state) => state?.answerstudent?.answerstudent);
  const users = useSelector((state) => state.user?.users);

  return (
    <>
      <button className="buttonStudent" onClick={() => setShow(!show)}>
        Student List
      </button>
      {show && (
        <div className="student_list">
          <div className="list">
            {users?.map((user) => {
              const userAnswers = answersStudent?.filter(
                (answer) => answer.quizz_id === e._id && answer.user_id === user._id
              );
              const answeredQuestionCount = userAnswers.length;

              if (answeredQuestionCount === questionLength) {
                return (
                  <div key={user._id} className="student">
                    <div className="contentstudent">
                      <div className="img">
                        <img src={user.user_img} alt="" />
                      </div>
                      <div className="text">
                        <p>
                          {user.nom} {user.prenom}
                        </p>
                        <p style={{ color: "gray" }}>{user.username}</p>
                      </div>
                    </div>
                    <div className="contstudent">
                      <Link to={`/quizzresult/${user._id}/${e._id}`}>
                        <button onClick={() => setReloadPage(!reloadPage)}>View Result</button>
                      </Link>
                    </div>
                  </div>
                );
              }
              return null;
            })}
            <button className="close" onClick={() => setShow(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};