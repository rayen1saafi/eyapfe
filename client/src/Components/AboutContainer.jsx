import React from "react";
import "../styles/about.css";

import { useSelector } from "react-redux";

const AboutContainer = () => {
  const pack = useSelector((state) => state.pack?.pack);
  const cours = useSelector((state) => state.cours?.cours);
  const packlength = pack?.length;
  const users = useSelector((state) => state.user?.users);
  const instractorLength = users?.filter(
    (el) => el.role == "Instructor"
  )?.length;
  const studentLength = users?.filter((el) => el.role == "user")?.length;
  const coursLength = cours?.length;
  return (
    <div className="about-container">
      <div className="section">
        <div className="ligne"></div>
        <h2>
          Trusted by <span style={{ color: "#f39a36" }}>Companies </span>{" "}
          Achievements
        </h2>
        <div className="ligne"></div>
      </div>
      <div className="content">
        <div className="container">
          <div className="number">
            <img src="https://i.postimg.cc/hGpfL4GF/teacher.png" alt="" />
          </div>

          <h3>{instractorLength}</h3>
          <p>Instractor</p>
        </div>
        <div className="container">
          <div className="number">
            <img
              src="https://i.postimg.cc/6phqdVWb/congratulation.png"
              alt=""
            />
          </div>

          <h3>{studentLength}</h3>
          <p>Students</p>
        </div>{" "}
        <div className="container">
          <div className="number">
            <img src="https://i.postimg.cc/Ls5nVq0t/package.png" alt="" />
          </div>

          <h3>{packlength}</h3>
          <p>Pack</p>
        </div>
        <div className="container">
          <div className="number">
            <img src="https://i.postimg.cc/jjcG8dCt/execution.png" alt="" />
          </div>

          <h3>{coursLength}</h3>
          <p>courses</p>
        </div>
      </div>
    </div>
  );
};

export default AboutContainer;
