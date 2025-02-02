import React, { useState } from "react";
import "../styles/learner.css";
import CreateInstructorModal from "./CreateInstructorModal";
import { useDispatch, useSelector } from "react-redux";
import { deleteuser } from "../redux/userSlice/userSlice";
import Headerdashboard from "./Headerdashboard";

const Learner = ({ reloadPage, setReloadPage, search }) => {
  const [openModale, setopenModale] = useState(false);
  const [isVisible, setIsVisible] = useState();
  const users = useSelector((state) => state.user?.users);
  const dispatch = useDispatch();
  const espace = " ";
  return (
    <main>
      <Headerdashboard />
      {isVisible == true ? (
        <div
          class={isVisible == true ? "alert-box success1" : "alert-box success"}
        >
          Instructor successfully added !!!
        </div>
      ) : isVisible == false ? (
        <div
          class={
            isVisible == false ? "alert-box warning1" : "alert-box warning"
          }
        >
          Email already exists !!!
        </div>
      ) : null}
      <div className="Instructor-dash-title">
        <div className="Instructor-d-title-container">
          <h3>
            <span style={{ color: "transparent" }}>hh</span> #Students
          </h3>
        </div>
      </div>
      <div className="leaner">
        <div className="learner-container">
          <div className="Learner">
            <div className="titres">
              <div className="fullname">Learner</div>
              <div className="email">Email</div>
              <div className="dett">Phone</div>
              <div className="dett">state</div>
              <div className="actions">Actions</div>
            </div>
            {users
              ?.filter(
                (el) =>
                  el?.nom?.toUpperCase().includes(search?.toUpperCase()) ||
                  el?.prenom?.toUpperCase().includes(search?.toUpperCase())
              )
              ?.filter((user) => user?.role === "user")
              .map((e) => (
                <div className="userdetails" key={e.id}>
                  <div className="fullname">
                    <div className="userimg">
                      <img src={e.user_img} alt="" />
                    </div>
                    <div className="fullnamedetails">
                      <h4>
                        {e?.nom} {e?.prenom}
                      </h4>
                      <p>@{e?.username}</p>
                    </div>
                  </div>
                  <div className="email">{e?.email}</div>
                  <div className="dett">{e?.phone}</div>
                  {e.isActivated == true ? (
                    <div className="dett">Activated</div>
                  ) : (
                    <div className="dett">Waiting</div>
                  )}
                  <div className="actions">
                    <button
                      className="del"
                      onClick={() => {
                        const confirmed = window.confirm(
                          "Are you sure you want to delete this user?"
                        );
                        if (confirmed) {
                          dispatch(deleteuser(e?._id));
                          setReloadPage(!reloadPage);
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Learner;
