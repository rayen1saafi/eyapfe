import React, { useEffect, useState } from "react";
import "../styles/cours-card.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CoursCard = ({ el }) => {
  const packs = useSelector((state) => state.pack?.pack);
  const user = useSelector((state) => state?.user?.user);
  const files = useSelector((state) => state?.file?.files);
  const lessons = useSelector((state) => state?.lesson?.lessons);
  const users = useSelector((state) => state.user?.users);
  const [percentage, setPercentage] = useState(0);
  const lessonInCours = lessons?.filter((les) => les.course_id === el._id);

  useEffect(() => {
    const totalLessonCount = lessonInCours?.length || 0;

    const totalFileCount =
      lessonInCours?.reduce((total, lesson) => {
        const filesForLesson = files?.filter(
          (file) => file.lesson_id === lesson._id
        );
        return total + (filesForLesson ? filesForLesson.length : 0);
      }, 0) || 0;

    const userFileCount =
      lessonInCours?.reduce((total, lesson) => {
        const filesForLesson = files?.filter(
          (file) => file.lesson_id === lesson._id
        );
        const userFilesForLesson = filesForLesson?.filter((file) =>
          file.done.includes(user?._id)
        );
        return total + (userFilesForLesson ? userFilesForLesson.length : 0);
      }, 0) || 0;

    const calculatedPercentage =
      totalFileCount > 0
        ? Math.floor((userFileCount / totalFileCount) * 100)
        : 0;
    setPercentage(calculatedPercentage);
  }, [el, user, files, lessons]);

  const packName = packs?.find((pack) => pack?._id === el?.pack_id);
  const instructor = users?.find((e) => e?._id === el?.instructor_id);

  return (
    <div className="cours-card">
      <div className="cours-card-img">
        <img src={el?.cours_image} alt="" />
      </div>
      <div className="cours-card-pack">
        <button>{packName?.nom}</button>
      </div>
      <Link to={`/cours/coursesdetails/${el?._id}`}>
        <h4>{el?.titre}</h4>
      </Link>
      {instructor && (
        <div className="cours-card-instructor">
          <img
            style={{ width: "30px", height: "30px" }}
            src={instructor?.user_img}
            alt=""
          />
          <span>
            {instructor?.nom} {instructor?.prenom}
          </span>
        </div>
      )}
      <div className="cours-card-time-student">
        <div className="titre_student">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-highlighter"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M11.096.644a2 2 0 0 1 2.791.036l1.433 1.433a2 2 0 0 1 .035 2.791l-.413.435-8.07 8.995a.5.5 0 0 1-.372.166h-3a.5.5 0 0 1-.234-.058l-.412.412A.5.5 0 0 1 2.5 15h-2a.5.5 0 0 1-.354-.854l1.412-1.412A.5.5 0 0 1 1.5 12.5v-3a.5.5 0 0 1 .166-.372l8.995-8.07zm-.115 1.47L2.727 9.52l3.753 3.753 7.406-8.254zm3.585 2.17.064-.068a1 1 0 0 0-.017-1.396L13.18 1.387a1 1 0 0 0-1.396-.018l-.068.065zM5.293 13.5 2.5 10.707v1.586L3.707 13.5z"
            />
          </svg>

          <p>
            {lessonInCours?.length === 0 || lessonInCours?.length === 1
              ? `${lessonInCours?.length} Lesson`
              : `${lessonInCours?.length} Lessons`}
          </p>
        </div>
        <>
          {user?.role == "user" && (
            <label className="label">
              {percentage}%
              <progress
                max="100"
                value="10"
                style={{ "--p": `${percentage}%` }}
              ></progress>
            </label>
          )}
        </>
      </div>
    </div>
  );
};

export default CoursCard;
