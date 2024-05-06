import React from "react";
import "../styles/sidebar.css";
import { logout } from "../redux/userSlice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
const SideBar = ({setSearch,search}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user?.user);
  useEffect(() => {
    const handleClick = () => {
      setSearch(""); // Clear the search bar
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [setSearch]);
  return (
    <>
      <div className="dashbord-side-nav-bar">
        <div className="SideBar">
        <div className="content_side">

<Link to="/">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    class="bi bi-house-door-fill"
    viewBox="0 0 16 16"
  >
    <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5" />
  </svg>
  Home

</Link>


</div>

<div className="content_side">

<Link to="/profile">
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
</svg>
  Profile

</Link>


</div>
          <div className="content_side">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              class="bi bi-grid-fill"
              viewBox="0 0 16 16"
            >
              <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5z" />
            </svg>
            DashBoard
          </div>
        

          <div className="content_side">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              class="bi bi-boxes"
              viewBox="0 0 16 16"
            >
              <path d="M7.752.066a.5.5 0 0 1 .496 0l3.75 2.143a.5.5 0 0 1 .252.434v3.995l3.498 2A.5.5 0 0 1 16 9.07v4.286a.5.5 0 0 1-.252.434l-3.75 2.143a.5.5 0 0 1-.496 0l-3.502-2-3.502 2.001a.5.5 0 0 1-.496 0l-3.75-2.143A.5.5 0 0 1 0 13.357V9.071a.5.5 0 0 1 .252-.434L3.75 6.638V2.643a.5.5 0 0 1 .252-.434zM4.25 7.504 1.508 9.071l2.742 1.567 2.742-1.567zM7.5 9.933l-2.75 1.571v3.134l2.75-1.571zm1 3.134 2.75 1.571v-3.134L8.5 9.933zm.508-3.996 2.742 1.567 2.742-1.567-2.742-1.567zm2.242-2.433V3.504L8.5 5.076V8.21zM7.5 8.21V5.076L4.75 3.504v3.134zM5.258 2.643 8 4.21l2.742-1.567L8 1.076zM15 9.933l-2.75 1.571v3.134L15 13.067zM3.75 14.638v-3.134L1 9.933v3.134z" />
            </svg>{" "}
            <Link to="dashbord/packs">Packing List</Link>
          </div>
          <div className="content_side">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              class="bi bi-people-fill"
              viewBox="0 0 16 16"
            >
              <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
            </svg>{" "}
            <Link to="dashbord/learner">Learner List</Link>
          </div>
          <div className="content_side">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-person-lines-fill"
              viewBox="0 0 16 16"
            >
              <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z" />
            </svg>{" "}
            <Link to="dashbord/Instructor">Instructor List</Link>
          </div>
       

          <div className="content_button">
            <button
              onClick={() => {
                dispatch(logout());
                navigate("/register");
              }}
            >
              Log Out
            </button>
          </div>
        </div>
        <div className="nav-dash">
          <div className="nav-dash-container">
            <div className="nav-dash-input">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="13"
                fill="currentColor"
                class="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
              <input 
                  onChange={(e) => setSearch(e.target.value)}
                  value={search} // Set the value of the input to search

              type="text" placeholder="Search..." />
            </div>
            <div className="dashbord-admin-img">
              <img src="/assets/test-inst.jpeg" alt="" />
              <h3>
                {user?.nom} {user?.prenom}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;