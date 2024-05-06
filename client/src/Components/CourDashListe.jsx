import React from 'react';
import '../styles/cours-dashbord.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import CreateCoursModal from './CreateCoursModal';
import { deleteCours } from '../redux/coursSlice/coursSlice';
import UpdateCoursModal from './UpdateCoursModal';
import { deleteLesson } from '../redux/lessonSlice/lessonSlice';
import { deleteFile } from '../redux/fileSlice/fileSlice';

const CourDashListe = ({reloadPage, setReloadPage, search}) => {
    const cours = useSelector((state) => state.cours?.cours);
    const { id } = useParams();
    const [openCourModale, setopenCourModale] = useState(false)
    const dispatch = useDispatch()
    // State to track which pack's modal should be open
    const [openModale, setOpenModale] = useState(false);
    const [openUpdateCModale, setopenUpdateModale] = useState(false);
    const [updateCourskId, setUpdatePackId] = useState(null);
    console.log(updateCourskId, "cours")

    const handleOpenUpdateModal = (packId) => {
        setUpdatePackId(packId);
    };
    const users = useSelector((state) => state.user?.users);

    const lessons = useSelector((state) => state?.lesson?.lessons);
    const files = useSelector((state) => state?.file?.files);

    const handleDeleteCours = async (course) => {
        const confirmed = window.confirm(
            'Are you sure you want to delete this cours?'
        );
        if (confirmed) {
            const courseId = course._id;
            const lessonsToDelete = lessons.filter(
                (lesson) => lesson.course_id === courseId
            );

            for (let j = 0; j < lessonsToDelete.length; j++) {
                const lessonId = lessonsToDelete[j]._id;
                await dispatch(deleteLesson({ id: lessonId }));

                const filesToDelete = files?.filter(
                    (file) => file.lesson_id === lessonId
                );

                for (let k = 0; k < filesToDelete.length; k++) {
                    const fileId = filesToDelete[k]._id;
                    await dispatch(deleteFile({ id: fileId }));
                }
            }

            await dispatch(deleteCours({ id: courseId }));

            setReloadPage(!reloadPage);
        }
    };

    return (
        <>
            {openCourModale &&
                <CreateCoursModal setopenCourModale={setopenCourModale} reloadPage={reloadPage} setReloadPage={setReloadPage} openCourModale={openCourModale} />
            }
            {cours?.map((el) => (
                <>
                    {updateCourskId === el?._id && (
                        <UpdateCoursModal setopenCourModale={setopenCourModale} el={el} reloadPage={reloadPage} setReloadPage={setReloadPage} setopenUpdateModale={setUpdatePackId} setOpenUpdateModale={setopenUpdateModale} />
                    )}
                </>
            ))}

            <div className="cours-dash-title">
                <div className="cours-d-title-container">
                    <h3>#COURSES</h3>
                    <button onClick={() => setopenCourModale(true)}>New cours</button>
                </div>
            </div>

            <div className="cours-dash">
                <div className="titres">
                    <div className="cours-name">Cours name</div>
                    <div className="description">description</div>
                    <div className="dett">Instructor</div>
                    <div className="actions">Actions</div>
                </div>

                {cours?.filter((el) => el?.pack_id == id).filter((el) => el.titre?.toUpperCase().includes(search.toUpperCase())).map((el) => (
                    <div className="userdetails" key={el._id}>
                        <div className="cours-name">
                            <div className="userimg">
                                <img
                                    src={el?.cours_image}
                                    alt=""
                                />
                            </div>
                            <div className="fullnamedetails">
                                <h4>{el?.titre}</h4>
                            </div>
                        </div>
                        <div className="description"> {el?.description?.length > 20 ? <>
                            {el?.description.substring(0, 20)}...
                        </> : <>
                            {el?.description.substring(0, 20)}

                        </>} </div>
                        <div className="description">
                            {users?.filter((e) => e._id == el?.instructor_id).map((user) => <>
                                < >{user?.nom} {user?.prenom}</>
                            </>)}
                        </div>

                        <div className="actions">
                            <button onClick={() => handleOpenUpdateModal(el._id)} className="views">
                                Update
                            </button>
                            <button className="del"
                                onClick={() => {
                                    handleDeleteCours(el)
                                }}
                            >
                                Delete
                            </button>
                            <div>

                            </div>
                        </div>
                    </div>
                )).reverse()}
            </div>
        </>
    );
};

export default CourDashListe;
