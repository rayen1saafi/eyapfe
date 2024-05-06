import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PagesHeader from "../Components/PagesHeader";
import CoursCard from "../Components/CoursCard";
import "../styles/course.css";
const Courses = () => {
  const cours = useSelector((state) => state.cours?.cours);
  const { id } = useParams();
  console.log(id);
  return (
    <>
      <PagesHeader />
      <div className="courses">
        <div className="courses-container">
          {cours
            ?.filter((el) => el?.pack_id == id)
            .map((el) => (
              <>
                <CoursCard el={el} />
              </>
            ))}
        </div>
      </div>
    </>
  );
};

export default Courses;
