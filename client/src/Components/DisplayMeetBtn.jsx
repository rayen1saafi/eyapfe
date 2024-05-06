import React, { useState } from "react";
import "../styles/CoursesDetails.css";
import { updateMeet } from "../redux/MeetSlice/meetSlice";
import { useDispatch } from "react-redux";
const DisplayMeetBtn = ({ mee, reloadPage, setReloadPage }) => {
  const [meet1, setmeet1] = useState({
    course_id: mee?.course_id,
    titre: mee?.titre,
    etat: true,
  });
  const dispatch = useDispatch();
  console.log("me", mee?._id);
  return (
    <button
      onClick={() => {
        dispatch(
          updateMeet({
            id: mee?._id, // Use mee._id directly (assuming mee is guaranteed to be defined)
            meet: meet1, // Set etat to true to display the meet
          })
        );
        setReloadPage(!reloadPage);
      }}
    >
      Display Meet
    </button>
  );
};

export default DisplayMeetBtn;
