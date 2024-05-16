import React from "react";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "../styles/homecourses.css";
import CoursCard from "./CoursCard";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const HomeCourses = () => {
  const cours = useSelector((state) => state.cours?.cours);
  const { id } = useParams();

  return (
    <div className="home-courses">
      <div className="home-courses-container">
        <h4>Our Courses List</h4>
        <h1>Most Popular Courses</h1>
        <div className="home-courses-carousel splide">
          <Splide
            options={{
              perPage: 3,
              rewind: true,
            }}
          >
            {cours?.map((el, index) => (
              <SplideSlide key={index}>
                <CoursCard el={el} />
              </SplideSlide>
            ))}
          </Splide>
        </div>
      </div>
    </div>
  );
};

export default HomeCourses;
