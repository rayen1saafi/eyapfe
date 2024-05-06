import React, { useEffect, useState } from 'react';
import '../styles/instructors-card.css';
import { Link } from 'react-router-dom';
import Rating from "react-rating-stars-component";
import { useDispatch, useSelector } from 'react-redux';
import { getRating } from '../redux/ratingSlice/ratingSlice';

const InstructorsCard = ({ e }) => {
  const user = useSelector((state) => state.user?.user);
  const ratings = useSelector((state) => state.rating?.rating);
  const dispatch = useDispatch();

  const [userRating, setUserRating] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && e._id && !ratings) {
      dispatch(getRating())
        .catch((error) => console.error("Error fetching user rating:", error))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user, e._id, dispatch, ratings]);

  useEffect(() => {
    if (user && ratings) {
      const userRating = ratings?.find((rating) => rating?.instructor_id === e._id && rating.rater_id === user._id);
      setUserRating(userRating ? userRating.rate : 0);
    }
  }, [user, e._id, ratings]);

  const calculateAverageRating = () => {
    if (!e || !ratings) return { numerical: 0, stars: 0 };
  
    const instructorRatings = ratings.filter((rating) => rating.instructor_id === e._id);
    if (instructorRatings.length === 0) return { numerical: 0, stars: 0 };
  
    const totalRating = instructorRatings.reduce((sum, rating) => sum + rating.rate, 0);
    const averageRating = totalRating / instructorRatings.length;
  
    return { numerical: averageRating, stars: Math.round(averageRating) };
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="ins-card">
        {e.user_img == "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW6hmwoTYquPrdYd_DfDFnXxsM8RBTm4GvNLla16kpEg&s" ? 
      <>
              <img src="https://d24q3ld97k5pkl.cloudfront.net/images/testimonial_logos/testimonial_male.png?_g_app_v_=4.4.7" alt="" />

      </>: <>
      <img src={e.user_img} alt="" />

      </>  
      }
        <div className="background-ins-card">
          <div className="ins-card-name">
            <h3>{e.nom} {e.prenom}</h3>
            <Link to={`/instructors/details/${e._id}`}>
              <p>view profile</p>
              <Rating
                value={calculateAverageRating().stars}
                edit={false} // Disable editing
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default InstructorsCard;
