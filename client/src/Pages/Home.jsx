import React from "react";
import "../styles/home.css";
import HomeHeader from "../Components/HomeHeader";
import HomeFeatures from "../Components/HomeFeatures";
import HomeAbout from "../Components/HomeAbout";
const Home = () => {
  return (
    <>
      <HomeHeader />
      <HomeFeatures/>
      <HomeAbout/>
    </>
  );
};

export default Home;
