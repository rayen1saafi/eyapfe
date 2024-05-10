import React from "react";
import "../styles/home.css";
import HomeHeader from "../Components/HomeHeader";
import HomeFeatures from "../Components/HomeFeatures";
import HomeAbout from "../Components/HomeAbout";
import HomeCourses from "../Components/HomeCourses";

import InstrctorHome from "../Components/InstrctorHome";
const Home = () => {

  return (
    <>
      <HomeHeader />
      <HomeFeatures/>
      <HomeAbout/>
      <HomeCourses/>
      <InstrctorHome/>
    
    </>
  );
};

export default Home;
