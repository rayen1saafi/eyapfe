import React from "react";
import "../styles/home.css";
import HomeHeader from "../Components/HomeHeader";
import HomeFeatures from "../Components/HomeFeatures";
import HomeAbout from "../Components/HomeAbout";
import HomeCourses from "../Components/HomeCourses";

import InstrctorHome from "../Components/InstrctorHome";
import AboutContainer from "../Components/AboutContainer";
import "../styles/about.css";

const Home = () => {
  return (
    <>
      <HomeHeader />
      <HomeFeatures />
      <HomeAbout />
      <HomeCourses />
      <InstrctorHome />
      <div className="about">
        <AboutContainer />
      </div>
    </>
  );
};

export default Home;
