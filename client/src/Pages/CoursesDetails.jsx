import React, { useEffect, useState } from "react";
import "../styles/CoursesDetails.css";
import Lessons from "../Components/Lessons";
import Quizz from "../Components/Quizz";
import PagesHeader from "../Components/PagesHeader";
import { useDispatch, useSelector } from "react-redux";
import { createLesson } from "../redux/lessonSlice/lessonSlice";
import { Link, useParams } from "react-router-dom";
import Progressc from "../Components/Progressc";
import { createQuizz, getQuizz } from "../redux/QuizzSlice/quizzSlice";
import { getQuestion } from "../redux/QuizzSlice/questionSlice";
import { getAnswer } from "../redux/QuizzSlice/answerSlice";
import { getAnswerStudent } from "../redux/QuizzSlice/answerStudentSlice";
import {
  createMeet,
  deletMeet,
  updateMeet,
} from "../redux/MeetSlice/meetSlice";
import DisplayMeetBtn from "../Components/DisplayMeetBtn";
import DisableButtonMeeting from "../Components/DisableButtonMeeting";

const CoursesDetails = ({
  reloadPage,
  setReloadPage,
  setpourcentageCours,
  pourcentageCours,
}) => {
  const { id } = useParams();

  const [lessons, setLessons] = useState({
    course_id: "",
    titre: "",
  });
  const [quizz, setquizz] = useState({
    course_id: "",
    titre: "",
  });
  const [meet, setmeet] = useState({
    course_id: id,
    titre: "",
  });
  const cours = useSelector((state) => state?.cours?.cours);
  const users = useSelector((state) => state?.user?.users);
  const lesson = useSelector((state) => state?.lesson?.lessons);
  const user = useSelector((state) => state?.user?.user);
  const pack = useSelector((state) => state?.pack?.pack);
  const files = useSelector((state) => state?.file?.files);
  const meets = useSelector((state) => state?.meet?.meet);
  console.log("meetttttttttttttttttt", meets);
  var student;

  useEffect(() => {
    dispatch(getQuizz());
    dispatch(getQuestion());
    dispatch(getAnswer());
    dispatch(getAnswerStudent());
  }, [reloadPage]);
  useEffect(() => {
    setLessons((prevLessons) => ({
      ...prevLessons,
      course_id: id,
    }));
    setquizz((prevquizz) => ({
      ...prevquizz,
      course_id: id,
    }));
  }, [id]);

  const dispatch = useDispatch();

  const handleAddLesson = () => {
    dispatch(createLesson(lessons));
    setReloadPage((prevReloadPage) => !prevReloadPage);
  };
  const handleAddQuizz = () => {
    dispatch(createQuizz(quizz));
    setReloadPage((prevReloadPage) => !prevReloadPage);
  };
  const handleAddMeet = () => {
    dispatch(createMeet(meet));
    setReloadPage((prevReloadPage) => !prevReloadPage);
  };

  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const lessonInCours = lesson?.filter((les) => les.course_id === id) || [];
    const totalLessonCount = lessonInCours.length;

    const totalFileCount = lessonInCours.reduce((total, lesson) => {
      const filesForLesson =
        files?.filter((file) => file.lesson_id === lesson?._id) || [];
      return total + filesForLesson.length;
    }, 0);

    const userFileCount = lessonInCours.reduce((total, lesson) => {
      const filesForLesson =
        files?.filter((file) => file.lesson_id === lesson?._id) || [];
      const userFilesForLesson = filesForLesson.filter((file) =>
        file.done.includes(user?._id)
      );
      return total + userFilesForLesson.length;
    }, 0);

    const calculatedPercentage =
      totalFileCount > 0
        ? Math.floor((userFileCount / totalFileCount) * 100)
        : 0;
    setPercentage(calculatedPercentage);
  }, [user, files, id, lesson]);

  const [progressWidth, setProgressWidth] = useState(0);

  useEffect(() => {
    const progressElement = document.querySelector(".progress-done");
    if (progressElement) {
      setTimeout(() => {
        progressElement.style.opacity = 1;
        progressElement.style.width = `${percentage}%`;
      }, 500);
    }
  }, [percentage]);
  return (
    <>
      <PagesHeader />

      {cours
        ?.filter((cour) => cour._id === id)
        .map((el) => (
          <div className="coursesdetails" key={el._id}>
            <div className="coursesdetails_Content">
              <div className="coursesStudentDndHours">
                {users
                  ?.filter((e) => e._id == el?.instructor_id)
                  .map((user) => (
                    <div className="det" key={user._id}>
                      <div className="img">
                        <img src={user?.user_img} alt="" />
                      </div>
                      <p>
                        {user?.nom} {user?.prenom}
                      </p>
                    </div>
                  ))}
                <div className="det">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="bi bi-person-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6.5 0a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0zm-.5 0a3.5 3.5 0 1 0-7 0 3.5 3.5 0 0 0 7 0z" />
                  </svg>
                  {pack
                    ?.filter((e) => e?._id == el?.pack_id)
                    .map((e) => {
                      let studentCount = 0;
                      return (
                        <div className="student_content" key={e._id}>
                          {e.student.map((st) => {
                            return (
                              <div key={st}>
                                {users
                                  ?.filter((user) => user._id == st)
                                  .map((user) => {
                                    studentCount++;
                                    return (
                                      <div
                                        className="details"
                                        key={user?._id}
                                      ></div>
                                    );
                                  })}
                              </div>
                            );
                          })}
                          <p>
                            {studentCount}{" "}
                            {studentCount <= 1 ? "Student" : "Students"}
                          </p>
                        </div>
                      );
                    })}
                </div>
              </div>
              {user?.role == "user" && (
                <div className="progress_">
                  <div
                    className="progress-done"
                    style={{ width: `${percentage}%` }}
                  >
                    {percentage > 0 ? (
                      <>{percentage}% completed</>
                    ) : (
                      <>
                        <p
                          style={{
                            marginLeft: "50px",
                          }}
                        >
                          0%
                        </p>
                      </>
                    )}
                  </div>
                </div>
              )}

              <div className="coursDescription">
                <h1>{el.titre}</h1>
                <p>{el?.description}</p>
              </div>

              <div className="lessons">
                {user?.role == "Instructor" &&
                user?._id === el.instructor_id ? (
                  <div className="addlesson">
                    <input
                      type="text"
                      placeholder="Meet Title"
                      onChange={(e) =>
                        setmeet((prevMeet) => ({
                          ...prevMeet,
                          titre: e.target.value,
                        }))
                      }
                    />
                    <button onClick={handleAddMeet}>Add Meet</button>
                  </div>
                ) : null}

                {Array.isArray(meets) &&
                  meets
                    .filter((mee) => mee?.course_id === id)
                    .map((mee) => (
                      <div className="Meet">
                        <h2>Metting : {mee?.titre}</h2>
                        {pack
                          ?.filter((pa) => pa._id === el.pack_id)
                          .map((pa) => {
                            student = (pa?.student).findIndex(
                              (el) => el === user?._id
                            );
                            if (student >= 0) {
                              return (
                                <>
                                  {mee?.etat == true ? (
                                    <Link to={`/meet/${mee?._id}`}>
                                      <button>Join</button>
                                    </Link>
                                  ) : (
                                    <button
                                      className="btnjoin"
                                      onClick={() => {
                                        const confirmed = window.confirm(
                                          "This meeting is not available: instructor did not activate the meeting"
                                        );
                                        if (confirmed) {
                                        }
                                      }}
                                    >
                                      Join
                                    </button>
                                  )}
                                </>
                              );
                            } else {
                              return null;
                            }
                          })}

                        {user?.role == "Instructor" &&
                        user?._id === el.instructor_id ? (
                          <>
                            {mee.etat == true ? (
                              <>
                                <Link to={`/meet/${mee?._id}`}>
                                  <button>Join</button>
                                </Link>
                                <button
                                  className="deleteMeet"
                                  onClick={() => {
                                    dispatch(deletMeet({ id: mee?._id }));
                                    setReloadPage(!reloadPage);
                                  }}
                                >
                                  Delete
                                </button>
                                <DisableButtonMeeting
                                  mee={mee}
                                  setReloadPage={setReloadPage}
                                  reloadPage={reloadPage}
                                />
                              </>
                            ) : (
                              <>
                                <DisplayMeetBtn
                                  mee={mee}
                                  setReloadPage={setReloadPage}
                                  reloadPage={reloadPage}
                                />
                              </>
                            )}
                          </>
                        ) : null}
                      </div>
                    ))}
                {user?.role == "Instructor" &&
                user?._id === el.instructor_id ? (
                  <div className="addlesson">
                    <input
                      type="text"
                      placeholder="Lesson Title"
                      onChange={(e) =>
                        setLessons((prevLessons) => ({
                          ...prevLessons,
                          titre: e.target.value,
                        }))
                      }
                    />
                    <button onClick={handleAddLesson}>Add Lesson</button>
                  </div>
                ) : null}
                {lesson
                  ?.filter((e) => e.course_id === id)
                  .map((e) => (
                    <Lessons
                      key={e._id}
                      e={e}
                      reloadPage={reloadPage}
                      setReloadPage={setReloadPage}
                      id={id}
                      userid={user?._id}
                      elmi={el}
                    />
                  ))}
                {user?.role == "Instructor" &&
                user?._id === el.instructor_id ? (
                  <div className="addlesson" id="addlesson">
                    <input
                      type="text"
                      placeholder="Quizz Title"
                      onChange={(e) =>
                        setquizz((prevquizz) => ({
                          ...prevquizz,
                          titre: e.target.value,
                        }))
                      }
                    />
                    <button onClick={handleAddQuizz}>Add Quizz</button>
                  </div>
                ) : null}
                <Quizz
                  el={el}
                  setReloadPage={setReloadPage}
                  reloadPage={reloadPage}
                />
              </div>
            </div>
            <div className="listuser">
              {users
                ?.filter((e) => e._id == el?.instructor_id)
                .map((user) => (
                  <>
                    <div className="instractor">
                      <h2>Instructor</h2>
                      <div className="img">
                        <img src={user?.user_img} alt="" />
                      </div>
                      <h3>
                        {user?.nom} {user?.prenom}
                      </h3>
                      <h5>@{user?.username}</h5>
                      <div className="coursandStudent">
                        <div className="continare">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="bi bi-book-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783" />
                          </svg>
                          <p>
                            {cours?.reduce(
                              (count, el) =>
                                el?.instructor_id &&
                                user?._id === el?.instructor_id
                                  ? count + 1
                                  : count,
                              0
                            ) <= 1 ? (
                              <>
                                {cours?.reduce(
                                  (count, el) =>
                                    el?.instructor_id &&
                                    user?._id === el?.instructor_id
                                      ? count + 1
                                      : count,
                                  0
                                )}{" "}
                                cours
                              </>
                            ) : (
                              <>
                                {cours?.reduce(
                                  (count, el) =>
                                    el?.instructor_id &&
                                    user?._id === el?.instructor_id
                                      ? count + 1
                                      : count,
                                  0
                                )}{" "}
                                courses
                              </>
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="button">
                        <Link to={`/instructors/details/${user?._id}`}>
                          View Profile
                        </Link>
                      </div>
                    </div>
                  </>
                ))}
              <div className="student">
                <h2>Student List</h2>
                {pack
                  ?.filter((e) => e?._id == el?.pack_id)
                  .map((e) => (
                    <div className="student_content">
                      {e.student.map((st) => (
                        <div>
                          {" "}
                          {users
                            ?.filter((user) => user?._id == st)
                            .map((user) => (
                              <>
                                <div className="details">
                                  <div className="img">
                                    <img src={user?.user_img} alt="" />
                                  </div>
                                  <div className="fullname">
                                    <h4>
                                      {user?.nom} {user?.prenom}{" "}
                                    </h4>
                                    <p>@{user?.username} </p>
                                  </div>
                                </div>
                              </>
                            ))}
                        </div>
                      ))}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default CoursesDetails;
