import React, { useEffect, useState } from "react";
import "../styles/CoursesDetails.css";
import AddFileModal from "./AddFileModal";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteFile, updatedone } from "../redux/fileSlice/fileSlice";
import UpdateFileModal from "./UpdateFileModal";
import { deleteLesson } from "../redux/lessonSlice/lessonSlice";

const Lessons = ({
  e,
  setReloadPage,
  reloadPage,
  userid,
  elmi,
  pourcentageCours,
  setpourcentageCours,
}) => {
  const [showlessons, setshowlessons] = useState(false);
  const [showmodel, setshowModel] = useState(false);
  const files = useSelector((state) => state?.file?.files);
  const fileLength = files?.filter((el) => e._id === el.lesson_id).length;
  const number = 100 / fileLength;
  const [modelUpdate, setmodelUpdate] = useState(false);
  const [openFileModale, setOpenFileModale] = useState(false);
  const lesson = useSelector((state) => state?.lesson?.lessons);
  const cours = useSelector((state) => state?.cours?.cours);
  const pack = useSelector((state) => state.pack?.pack);
  var student;
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const lessons = useSelector((state) => state?.lesson?.lessons);
  var pourcentage = 0;

  files
    ?.filter((el) => e?._id === el.lesson_id)
    .forEach((el) => {
      if (el.done?.includes(user?._id)) {
        pourcentage += number;
      }
    });
  pourcentage = Math.floor(pourcentage);
  // Round down to the nearest integer
  // -------------------update file ---------------------
  const [openUpdateModale, setOpenUpdateModale] = useState(false);

  const [updateFileId, setUpdateFileId] = useState(null);

  const handleOpenUpdateModal = (fileId) => {
    setUpdateFileId(fileId);
    setmodelUpdate(true);
  };

  const handleDeleteLessons = async (lesson) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this lesson?"
    );
    if (confirmed) {
      await dispatch(deleteLesson({ id: lesson._id }));

      // Assuming you want to delete files related to this lesson too.
      const filesToDelete = files.filter(
        (file) => file.lesson_id === lesson._id
      );
      for (let file of filesToDelete) {
        await dispatch(deleteFile({ id: file._id }));
      }

      setReloadPage(!reloadPage);
    }
  };

  return (
    <>
      {showmodel ? (
        <AddFileModal
          e={e}
          showmodel={showmodel}
          setshowModel={setshowModel}
          setReloadPage={setReloadPage}
          reloadPage={reloadPage}
        />
      ) : null}

      <div className="lesson_titre">
        <div className="title-del">
          <p>{e.titre}: </p>
          {user?.role == "user" ? (
            <>
              <label className="label">
                {pourcentage}%
                <progress
                  className="progress"
                  max="100"
                  value="10"
                  style={{ "--p": `${pourcentage}%` }}
                ></progress>
              </label>
            </>
          ) : null}

          {elmi?.instructor_id == user?._id && (
            <>
              <svg
                onClick={() => handleDeleteLessons(e)} // Pass the lesson object directly
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-trash3-fill"
                viewBox="0 0 16 16"
              >
                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
              </svg>
            </>
          )}
        </div>

        {showlessons ? (
          <svg
            onClick={() => setshowlessons(!showlessons)}
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="bi bi-caret-down-fill"
            viewBox="0 0 16 16"
          >
            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
          </svg>
        ) : (
          <svg
            onClick={() => setshowlessons(!showlessons)}
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="bi bi-caret-up-fill"
            viewBox="0 0 16 16"
          >
            <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
          </svg>
        )}
      </div>
      <div className={showlessons ? "lessonContent1" : "lessonContent"}>
        {files
          ?.filter((file) => e._id === file.lesson_id)
          .map((el, index) => (
            <div key={index} className="cont">
              <div className="FileContent">
                <div className="titre">
                  {el.file_type === "image" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-card-image"
                      viewBox="0 0 16 16"
                    >
                      <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                      <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54L1 12.5v-9a.5.5 0 0 1 .5-.5z" />
                    </svg>
                  ) : el.file_type === "pdf" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-file-earmark"
                      viewBox="0 0 16 16"
                    >
                      <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-file-earmark-play-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1M6 6.883a.5.5 0 0 1 .757-.429l3.528 2.117a.5.5 0 0 1 0 .858l-3.528 2.117a.5.5 0 0 1-.757-.43V6.884z" />
                    </svg>
                  )}
                  <p>{el.titre}</p>
                </div>
                <div className="titre"></div>
                <div className="titre">
                  {updateFileId === el._id && (
                    <UpdateFileModal
                      el={el}
                      reloadPage={reloadPage}
                      setReloadPage={setReloadPage}
                      setopenUpdateModale={setUpdateFileId}
                      setOpenUpdateModale={setOpenUpdateModale}
                    />
                  )}
                  {elmi?.instructor_id === user?._id && (
                    <>
                      <button
                        onClick={() => handleOpenUpdateModal(el._id)}
                        className="update"
                      >
                        Update
                      </button>
                      <button
                        className="delete"
                        onClick={() => {
                          const confirmed = window.confirm(
                            "Are you sure you want to delete this file?"
                          );
                          if (confirmed) {
                            dispatch(deleteFile({ id: el._id }));
                            setReloadPage(!reloadPage);
                          }
                        }}
                      >
                        Delete
                      </button>
                      <Link to={`/fileDetails/${el._id}`}>
                        <button className="view">View</button>
                      </Link>{" "}
                    </>
                  )}
                  {lesson
                    ?.filter((les) => les._id === el.lesson_id)
                    .map((les) => (
                      <>
                        {cours
                          ?.filter((cour) => cour._id === les.course_id)
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
                                        {el.done.includes(user._id) ? (
                                          <>
                                            <button
                                              className="done"
                                              onClick={() => {
                                                dispatch(
                                                  updatedone({
                                                    id: el._id,
                                                    done: el.done.filter(
                                                      (el) => el !== user._id
                                                    ),
                                                  })
                                                );
                                                setReloadPage(!reloadPage);
                                              }}
                                            >
                                              done
                                            </button>
                                          </>
                                        ) : (
                                          <>
                                            <button
                                              className="mark"
                                              onClick={() => {
                                                dispatch(
                                                  updatedone({
                                                    id: el._id,
                                                    done: [
                                                      ...el.done,
                                                      user._id,
                                                    ],
                                                  })
                                                );
                                                setReloadPage(!reloadPage);
                                              }}
                                            >
                                              mark as done
                                            </button>
                                          </>
                                        )}

                                        <Link to={`/fileDetails/${el._id}`}>
                                          <button className="view">View</button>
                                        </Link>
                                      </>
                                    );
                                  } else {
                                    return null;
                                  }
                                })}
                            </>
                          ))}
                      </>
                    ))}
                </div>
              </div>
            </div>
          ))}
        {user?.role === "Instructor" && userid === elmi.instructor_id ? (
          <div className="cont">
            <div
              className="addlessons"
              onClick={() => {
                setshowModel(!showmodel);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-plus-lg"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
                />
              </svg>
              <button className="btn">Add file</button>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Lessons;
