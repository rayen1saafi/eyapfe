import React from "react";
import PagesHeader from "../Components/PagesHeader";
import InstructorsCard from "../Components/InstructorsCard";
import "../styles/instructors.css";
import { useSelector } from "react-redux";

const Instructors = () => {
  const users = useSelector((state) => state.user?.users);

  return (
    <>
      <PagesHeader />
      <div className="ins-card-container">
        <div className="ins-card-content">
          {users?.filter((user) => user?.role === "Instructor")?.map((e) => (
              <InstructorsCard e={e} />
            ))}
        </div>
      </div>
    </>
  );
};

export default Instructors;
