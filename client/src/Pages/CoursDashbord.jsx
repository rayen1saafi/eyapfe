import React, { useState } from "react";
import CourDashListe from "../Components/CourDashListe";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateinscri, updatestudent } from "../redux/packSlice/packSlice";

const CoursDashbord = ({ reloadPage, setReloadPage, search }) => {
  const { id } = useParams();
  const packs = useSelector((state) => state.pack?.pack);
  const users = useSelector((state) => state.user?.users);
  const dispatch = useDispatch();
  const [show, setshow] = useState(false);
  return (
    <>
      <div className="cours-dashbord">
        <div className="cour-dash-container">
          <CourDashListe
            search={search}
            reloadPage={reloadPage}
            setReloadPage={setReloadPage}
          />
        </div>
        <div className="btn_inscri_student">
          <button
            onClick={() => setshow(false)}
            className={show ? "btn1" : "btn"}
          >
            Invitation
          </button>
          <button
            onClick={() => setshow(true)}
            className={show ? "btn" : "btn1"}
          >
            Student List
          </button>
        </div>

        {!show ? (
          <>
            <h1 style={{ width: "78%", fontSize: "22px" }}> #Invitaion</h1>
            <div className="learner-container">
              <div className="Learner">
                <div className="titres">
                  <div className="fullname">Learner</div>
                  <div className="email">Email</div>
                  <div className="dett">Phone</div>
                  <div className="dett">state</div>
                  <div className="actions">Actions</div>
                </div>
                {packs
                  ?.filter((el) => el._id === id)
                  .map((e) => (
                    <>
                      {e.inscri.map((inscr) => (
                        <>
                          {users
                            ?.filter((user) => user._id === inscr)
                            .map((user) => (
                              <>
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
                                        {user?.nom} {user?.prenom}
                                      </h4>
                                      <p>@{user?.username}</p>
                                    </div>
                                  </div>
                                  <div className="email">{user?.email}</div>
                                  <div className="dett">{user?.phone}</div>
                                  {user.isActivated == true ? (
                                    <div className="dett">Activated</div>
                                  ) : (
                                    <div className="dett">Waiting</div>
                                  )}
                                  <div className="actions">
                                    <button
                                      className="views"
                                      onClick={() => {
                                        dispatch(
                                          updatestudent({
                                            id: e._id,
                                            student: [...e.student, user._id],
                                          })
                                        );
                                        dispatch(
                                          updateinscri({
                                            id: e._id,
                                            inscri: e.inscri.filter(
                                              (el) => el != user._id
                                            ),
                                          })
                                        );
                                        setReloadPage(!reloadPage);
                                      }}
                                    >
                                      Accept
                                    </button>
                                    <button
                                      className="del"
                                      onClick={() => {
                                        dispatch(
                                          updateinscri({
                                            id: e._id,
                                            inscri: e.inscri.filter(
                                              (el) => el != user._id
                                            ),
                                          })
                                        );
                                        setReloadPage(!reloadPage);
                                      }}
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              </>
                            ))}
                        </>
                      ))}
                    </>
                  ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <h1 style={{ width: "78%", fontSize: "22px" }}> #Student</h1>

            <div className="learner-container">
              <div className="Learner">
                <div className="titres">
                  <div className="fullname">Learner</div>
                  <div className="email">Email</div>
                  <div className="dett">Phone</div>
                  <div className="dett">state</div>
                  <div className="actions">Actions</div>
                </div>
                {packs
                  ?.filter((el) => el._id === id)
                  .map((e) => (
                    <>
                      {e.student.map((st) => (
                        <>
                          {users
                            ?.filter((user) => user._id === st)
                            .map((user) => (
                              <>
                                <div className="userdetails" key={e.id}>
                                  <div className="fullname">
                                    <div className="userimg">
                                      
                                      <img
                                        src={user?.user_img}
                                        alt=""
                                      />
                                    </div>
                                    <div className="fullnamedetails">
                                      <h4>
                                        {user?.nom} {user?.prenom}
                                      </h4>
                                      <p>@{user?.username}</p>
                                    </div>
                                  </div>
                                  <div className="email">{user?.email}</div>
                                  <div className="dett">{user?.phone}</div>
                                  {user.isActivated == true ? (
                                    <div className="dett">Activated</div>
                                  ) : (
                                    <div className="dett">Waiting</div>
                                  )}
                                  <div className="actions">
                                    <button
                                      className="del"
                                      onClick={() => {
                                        dispatch(
                                          updatestudent({
                                            id: e._id,
                                            student: [...e.student, user._id],
                                          })
                                        );
                                        dispatch(
                                          updatestudent({
                                            id: e._id,
                                            student: e.student.filter(
                                              (el) => el != user._id
                                            ),
                                          })
                                        );
                                        setReloadPage(!reloadPage);
                                      }}
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              </>
                            ))}
                        </>
                      ))}
                    </>
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CoursDashbord;
