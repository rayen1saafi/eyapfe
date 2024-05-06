import React from "react";
import "../styles/packs-card.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateinscri } from "../redux/packSlice/packSlice";

const PacksCard = ({ el, setReloadPage, reloadPage }) => {
  const cours = useSelector((state) => state.cours?.cours);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.user);

  var inscription = (el?.inscri).findIndex((el) => el === user?._id);
  var student = (el?.student).findIndex((el) => el === user?._id);

  // Filter courses that belong to the current pack
  const coursesInPack = cours?.filter((cour) => cour.pack_id === el._id);

  // ---------- calculate date
  function DateCalculator({ startDate, endDate }) {
    // Convert the start date and end date strings to Date objects
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    // Calculate the difference in milliseconds between the two dates
    const timeDifference = endDateObj.getTime() - startDateObj.getTime();

    // Convert milliseconds to days
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    return (
      <>
        {daysDifference == "1" ? (
          <>{daysDifference} day</>
        ) : (
          <> {daysDifference} days</>
        )}
      </>
    );
  }
  return (
    <>
      <div className={student >= 0 ? "packs-card2" : "packs-card"}>
        <img src={el.pack_image} alt="" />
        <div className="pack-title-inscri-btn">
          <Link to={`/cours/${el._id}`}>
            <h4>{el?.nom}</h4>
           
          </Link>
            {user?.role == "user" && 
               <div className="inscrit-pack-card">
               {student >= 0  ? null : inscription < 0   ? (
                 <button
                   className="btnainscr"
                   onClick={() => {
                     dispatch(
                       updateinscri({
                         id: el._id,
                         inscri: [...el.inscri, user._id],
                       })
                     );
                     setReloadPage(!reloadPage);
                   }}
                 >
                   Enroll now
                 </button>
               ) : (
                 <button
                   className="btnwiting"
                   onClick={() => {
                     dispatch(
                       updateinscri({
                         id: el._id,
                         inscri: el.inscri.filter((el) => el != user._id),
                       })
                     );
                     setReloadPage(!reloadPage);
                   }}
                 >
                   Cancel
                 </button>
               )}
             </div>
            }
       
        </div>

        <div className="packs-card-cours">
          <div className="p-c-num">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20"
              fill="currentColor"
              class="bi bi-play-circle"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
              <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445" />
            </svg>
            <span>
              {coursesInPack?.length === 0 || coursesInPack?.length === 1
                ? `${coursesInPack?.length} Cours`
                : `${coursesInPack?.length} Courses`}
            </span>
          </div>

          <div className="pack-days">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-calendar-event"
              viewBox="0 0 16 16"
            >
              <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z" />
              <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
            </svg>
            <DateCalculator startDate={el?.dateDebut} endDate={el?.dateFin} />
          </div>
        </div>
      </div>
    </>
  );
};

export default PacksCard;
