import React, { useState, useEffect } from "react";
import "../styles/instructorsdetails.css";
import PagesHeader from "../Components/PagesHeader";
import ContactInstructor from "../Components/ContactInstructor";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CoursCard from "../Components/CoursCard";
import Rating from "react-rating-stars-component";
import { createRating, getRating, updateRating } from "../redux/ratingSlice/ratingSlice";

const InstructorsDetails = ({reloadPage,setReloadPage}) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user?.users);
  const courses = useSelector((state) => state?.cours?.cours);
  const user = useSelector((state) => state.user?.user);
  const ratings = useSelector((state) => state.rating?.rating);

  const [userRating, setUserRating] = useState(null); // Initialize userRating to null
  const [loading, setLoading] = useState(true);
  const [instructor, setInstructor] = useState(null);

  useEffect(() => {
    // Fetch the user's rating for the instructor
    if (user && id && !ratings) {
      dispatch(getRating())
        .catch((error) => console.error("Error fetching user rating:", error))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user, id, dispatch, ratings]);

  useEffect(() => {
    // Set the initial user rating if ratings are available
    if (user && ratings) {
      const userRating = ratings?.find((rating) => rating?.instructor_id === id && rating.rater_id === user._id);
      setUserRating(userRating ? userRating.rate : 0);
    }
  }, [user, id, ratings]);

  useEffect(() => {
    const selectedInstructor = users?.find((user) => user._id === id);
    setInstructor(selectedInstructor);
  }, [id, users]);

  const countCoursesByInstructor = (instructorId) => {
    return courses?.filter(
      (course) => course?.instructor_id === instructorId || course?.pack_id === id
    ).length;
  };

  const handleRatingChange = (rating) => {
    setUserRating(rating);
    const ratingData = {
      instructor_id: id,
      rater_id: user?._id,
      rate: rating
    };

    const existingRating = ratings?.find((rating) => rating.instructor_id === id && rating.rater_id === user?._id);
    if (existingRating) {
      // If user has already rated, update the existing rating
      dispatch(updateRating({ id: existingRating._id, rating: rating }));
      setReloadPage(!reloadPage)
    } else {
      // If user hasn't rated, create a new rating
      dispatch(createRating(ratingData));
           setReloadPage(!reloadPage)
    }
  };

  const calculateAverageRating = (instructor) => {
    if (!instructor || !ratings) return { numerical: 0, stars: 0 };
  
    const instructorRatings = ratings.filter((rating) => rating.instructor_id === instructor._id);
    if (instructorRatings.length === 0) return { numerical: 0, stars: 0 };
  
    const totalRating = instructorRatings.reduce((sum, rating) => sum + rating.rate, 0);
    const averageRating = totalRating / instructorRatings.length;
  
    return { numerical: averageRating, stars: Math.round(averageRating) }; // Round the average rating for stars
  };
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <PagesHeader />

      {instructor && (
        <div key={instructor._id}>
          <ContactInstructor
            instructor={instructor}
            courseCount={countCoursesByInstructor(instructor._id)}
          />
          <div className="rating-instruct">
          {/* <>
            <div className="rating-profile">
            Average Rating :   
            <Rating
              value={calculateAverageRating(instructor).stars}
              edit={false} // Disable editing
            />
          </div>
          </> */}
      
       
          {user?.role =="user" &&
            <div className="user-rate">
            Make your rate:  
            <Rating
              value={userRating !== null ? userRating : 0}
              onChange={handleRatingChange}
            />
            </div>
          }
        
        
          </div>
      
       
        </div>
      )}
      <div className="cours-list-int-profile-container">
        <div className="cours-list-int-profile">
          {courses && courses
            ?.filter(
              (course) => course?.instructor_id === id || course?.pack_id === id
            )
            .map((course) => (
              <CoursCard key={course._id} el={course} />
            ))}
        </div>
      </div>
    </>
  );
};

export default InstructorsDetails;
