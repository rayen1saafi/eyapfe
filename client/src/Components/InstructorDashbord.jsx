import React, { useState } from "react";
import "../styles/learner.css";
import CreatePackModal from "./CreatePackModal";
import CreateInstructorModal from "./CreateInstructorModal";
import { useDispatch, useSelector } from "react-redux";
import { deleteuser } from "../redux/userSlice/userSlice";

const InstructorDashbord = ({ reloadPage, setReloadPage, search }) => {
  const [openModale, setopenModale] = useState(false);
  const [isVisible, setIsVisible] = useState();
  const users = useSelector((state) => state.user?.users);
  const dispatch = useDispatch();

  return (
    <>
      {openModale && (
        <CreateInstructorModal
          setopenModale={setopenModale}
          setIsVisible={setIsVisible}
          reloadPage={reloadPage}
          setReloadPage={setReloadPage}
        />
      )}
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
          <h3>#PACKS</h3>
          <button onClick={() => setopenModale(true)}>New Instructor</button>
        </div>
      </div>
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
                el.nom?.toUpperCase().includes(search.toUpperCase()) ||
                el.prenom?.toUpperCase().includes(search.toUpperCase())
            )
            ?.filter((user) => user.role === "Instructor")
            .map((e) => (
              <div className="userdetails" key={e.id}>
                <div className="fullname">
                  <div className="userimg">
                    <img
                      src="https://media.licdn.com/dms/image/C4E03AQEEZUPHzQoE0A/profile-displayphoto-shrink_400_400/0/1623677348445?e=2147483647&v=beta&t=4yBsLbVOvjpli7F64hdqdgYCNg6KkkCwqV8WIHW-YZA"
                      alt=""
                    />
                  </div>
                  <div className="fullnamedetails">
                    <h4>
                      {e.nom} {e.prenom}
                    </h4>
                    <p>@{e.username}</p>
                  </div>
                </div>
                <div className="email">{e.email}</div>
                <div className="dett">{e.phone}</div>
                {e.isActivated == true ? (
                  <div className="dett">true</div>
                ) : (
                  <div className="dett">false</div>
                )}
                <div className="actions">
                  <button className="views">Views</button>
                  <button
                    className="del"
                    onClick={() => {
                      const confirmed = window.confirm(
                        "Are you sure you want to delete this user?"
                      );
                      if (confirmed) {
                        dispatch(deleteuser(e._id));
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
    </>
  );
};

export default InstructorDashbord;
