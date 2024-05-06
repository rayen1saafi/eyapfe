import React from 'react';
import '../styles/cours_inst_profile.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const CoursIProfile = ({el}) => {
    const packs = useSelector((state) => state.pack?.pack);
    const packName = packs?.filter((pack) => pack?._id === el?.pack_id);
  
    // Check if users is an array before using filter
    const users = useSelector((state) => state.user?.users);
    const instructor = users && Array.isArray(users) ? users.find((e) => e?._id === el?.instructor_id) : null;
  
  return (
    <div className="cours-profile-card-container">

<div className="cours-profile-card">
    <img src={el?.cours_image} alt="" />
    <div className="cours-profile-card-pack">
      <button>{packName?.map((pn) => <>STACK : {pn.nom}</>)}</button>
      <Link to={`/cours/coursesdetails/${el?._id}`}>
      <h5>COURS : {el?.titre}</h5>
    </Link>
    </div>

    {/* {instructor && (
      <div className="cours-profile-card-instructor">     
      </div>
    )} */}

  </div>
    </div>
 
  )
}

export default CoursIProfile