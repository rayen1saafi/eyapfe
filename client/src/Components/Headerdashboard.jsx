import React from "react";
import "../styles/headerdahs.css";
import { useSelector } from "react-redux";
const Headerdashboard = () => {
  const pack = useSelector((state) => state.pack?.pack);
  const cours = useSelector((state) => state.cours?.cours);
  const packlength = pack?.length;
  const users = useSelector((state) => state.user?.users);
  const instractorLength = users?.filter(
    (el) => el.role == "Instructor"
  )?.length;
  const studentLength = users?.filter((el) => el.role == "user")?.length;
  const coursLength = cours?.length;
  return (
    <>
      <div className="Headerdashboard">
        <h3>Dashboard</h3>
        <div className="details">
          <div className="part">
            <div className="titre">
              <div className="svg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="bi bi-person-vcard-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm9 1.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4a.5.5 0 0 0-.5.5M9 8a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4A.5.5 0 0 0 9 8m1 2.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 0-1h-3a.5.5 0 0 0-.5.5m-1 2C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 0 2 13h6.96q.04-.245.04-.5M7 6a2 2 0 1 0-4 0 2 2 0 0 0 4 0" />
                </svg>
              </div>
            </div>
            <div className="txt">
              <h1>{studentLength}</h1>
            </div>
            <div className="txt">
              <h2>Students</h2>
            </div>
          </div>
          <div className="part">
            <div className="titre">
              <div className="svg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="bi bi-person-square"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
                </svg>
              </div>
            </div>
            <div className="txt">
              <h1>{instractorLength}</h1>
            </div>
            <div className="txt">
              <h2>Instructors</h2>
            </div>
          </div>
          <div className="part">
            <div className="titre">
              <div className="svg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="bi bi-box-seam-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M15.528 2.973a.75.75 0 0 1 .472.696v8.662a.75.75 0 0 1-.472.696l-7.25 2.9a.75.75 0 0 1-.557 0l-7.25-2.9A.75.75 0 0 1 0 12.331V3.669a.75.75 0 0 1 .471-.696L7.443.184l.01-.003.268-.108a.75.75 0 0 1 .558 0l.269.108.01.003zM10.404 2 4.25 4.461 1.846 3.5 1 3.839v.4l6.5 2.6v7.922l.5.2.5-.2V6.84l6.5-2.6v-.4l-.846-.339L8 5.961 5.596 5l6.154-2.461z"
                  />
                </svg>
              </div>
            </div>
            <div className="txt">
              <h1>{packlength}</h1>
            </div>
            <div className="txt">
              <h2>Packs</h2>
            </div>
          </div>
          <div className="part">
            <div className="titre">
              <div className="svg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="bi bi-book-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783" />
                </svg>
              </div>
            </div>
            <div className="txt">
              <h1>{coursLength}</h1>
            </div>
            <div className="txt">
              <h2>Courses</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="margin"></div>
    </>
  );
};

export default Headerdashboard;
