import React from "react";
import "../styles/about.css";
import PagesHeader from "../Components/PagesHeader";
import { useSelector } from "react-redux";
import InstructorsCard from "../Components/InstructorsCard";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import AboutContainer from "../Components/AboutContainer";
import HomeFeatures from "../Components/HomeFeatures";
import HomeAbout from "../Components/HomeAbout";
const About = () => {
  const pack = useSelector((state) => state.pack?.pack);
  const cours = useSelector((state) => state.cours?.cours);
  const packlength = pack?.length;
  const users = useSelector((state) => state.user?.users);
  const instractorLength = users?.filter(
    (el) => el.role == "Instructor"
  )?.length;
  const studentLength = users?.filter((el) => el.role == "user")?.length;
  const coursLength = cours?.length;
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="about">
      <HomeFeatures />
      <HomeAbout />

      <AboutContainer />
      

      
    </div>
  );
};

export default About;
