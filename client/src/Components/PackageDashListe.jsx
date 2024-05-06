import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import CreatePackModal from './CreatePackModal';
import { deletePack } from '../redux/packSlice/packSlice';
import UpdatePackModal from './UpdatePackModal';
import { deleteCours } from '../redux/coursSlice/coursSlice';
import { deleteFile } from '../redux/fileSlice/fileSlice';
import { deleteLesson } from '../redux/lessonSlice/lessonSlice';

const PackageDashListe = ({ reloadPage, setReloadPage, search, setSearch }) => {
  const packs = useSelector((state) => state?.pack?.pack);
  const cours = useSelector((state) => state?.cours?.cours);
  const lessons = useSelector((state) => state?.lesson?.lessons);
  const files = useSelector((state) => state?.file?.files);

  const dispatch = useDispatch();

  // State to track which pack's modal should be open
  const [openModale, setOpenModale] = useState(false);
  const [openUpdateModale, setOpenUpdateModale] = useState(false);
  const [updatePackId, setUpdatePackId] = useState(null);

  const handleOpenUpdateModal = (packId) => {
    setUpdatePackId(packId);
  };
  const handleDeletePack = async (packId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this pack?"
    );
    if (confirmed) {
      const coursesToDelete = cours.filter((cour) => cour.pack_id === packId);
  
      console.log("Courses to delete:", coursesToDelete);
  
      for (let i = 0; i < coursesToDelete.length; i++) {
        const courseId = coursesToDelete[i]._id;
        console.log("Course ID:", courseId);
  
        const lessonsToDelete = lessons.filter((lesson) => lesson.course_id === courseId);
        console.log("Lessons to delete:", lessonsToDelete);
        
        // Delete lessons associated with the course
        for (let j = 0; j < lessonsToDelete.length; j++) {
          const lessonId = lessonsToDelete[j]._id;
          console.log("Deleting lesson with ID:", lessonId);
          await dispatch(deleteLesson({ id: lessonId }));
  
          // Delete files associated with the lesson
          const filesToDelete = files?.filter((file) => file.lesson_id === lessonId);
          console.log("Files to delete:", filesToDelete);
          for (let k = 0; k < filesToDelete.length; k++) {
            const fileId = filesToDelete[k]._id;
            console.log("Deleting file with ID:", fileId);
            await dispatch(deleteFile({ id: fileId }));
          }
        }
  
        // Delete the course
        await dispatch(deleteCours({ id: courseId }));
      }
      
      // Delete the pack itself
      await dispatch(deletePack({ id: packId }));
      setReloadPage(!reloadPage);
    }
  };
  
  
  


  return (
    <>
      {openModale && <CreatePackModal reloadPage={reloadPage} setReloadPage={setReloadPage} setopenModale={setOpenModale} openModale={openModale} />}
      {packs?.map((el) => (
        <>
          {updatePackId === el?._id && (
            <UpdatePackModal el={el} reloadPage={reloadPage} setReloadPage={setReloadPage} setopenUpdateModale={setUpdatePackId} setOpenUpdateModale={setOpenUpdateModale} />
          )}
        </>
      ))}

      <div className="packs-dash-title">
        <div className="packs-d-title-container">
          <h3>#PACKS</h3>
          <button onClick={() => setOpenModale(true)}>New Pack</button>
        </div>
      </div>
      <div className="packs-dash">
        <div className="titres">
          <div className="fullname">Pack name</div>
          <div className="email">Courses</div>
          <div className="dett">Starting Date</div>
          <div className="dett">Ending Date</div>
          <div className="actions">Actions</div>
        </div>
        {packs
          ?.filter((el) => el?.nom?.toUpperCase().includes(search.toUpperCase()))
          .map((el) => {
            const coursesInPack = cours?.filter((cour) => cour?.pack_id === el?._id);
            return (
              <div className="userdetails" key={el._id}>
                <div className="fullname">
                  <div className="userimg">
                    <img src={el?.pack_image} alt="" />
                  </div>
                  <div className="fullnamedetails">
                    <Link to={`/dashbord/cours/${el._id}`}>
                      <h4>{el?.nom}</h4>
                    </Link>
                  </div>
                </div>
                <div className="email">
                  {coursesInPack?.length === 0 || coursesInPack?.length === 1
                    ? `${coursesInPack?.length} Cours`
                    : `${coursesInPack?.length} Courses`}
                </div>
                <div className="dett">{el?.dateDebut}</div>
                <div className="dett">{el?.dateFin}</div>
                <div className="actions">
                  <div>
                    <button onClick={() => handleOpenUpdateModal(el._id)} className="views">
                      Update
                    </button>
                  </div>
                  <button
                    className="del"
                    onClick={() => handleDeletePack(el._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
          .reverse()}
      </div>
    </>
  );
};

export default PackageDashListe;
