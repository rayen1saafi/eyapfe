import React, { useState } from "react";
import "../styles/navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice/userSlice";
import { useEffect } from "react";

const Navbar = () => {
  const isAuth = localStorage.getItem("token");
  const user = useSelector((state) => state.user?.user);
  const [showLogout, setshowLogout] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Function to handle click outside of profile dropdown
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".nav-profile-logout") &&
        !event.target.closest(".nav-profile-image")
      ) {
        setshowLogout(true); // Hide the logout dropdown if clicked outside
      }
    };

    // Add click event listener to the document body
    document.body.addEventListener("click", handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav>
        <div className="navbar-logo">
          <img src="/assets/navbar-logo.png" alt="" />
        </div>
        <div className="navbar-content">
          {user?.role === "admin" && (
            <Link to="/dashbord/learner">
              <span>
                Dashbord <section></section>
              </span>
            </Link>
          )}
          <Link to="/">
            <span>
              Home <section></section>
            </span>
          </Link>
          <Link to="/packs">
            <span>
              Packs <section></section>
            </span>
          </Link>
          <Link to="/about">
            <span>
              About <section></section>
            </span>
          </Link>

          <Link to="/contact">
            <span>
              Contact Us <section></section>
            </span>
          </Link>
          <Link to="/instructors">
            <span>
              Instructors <section></section>
            </span>
          </Link>
          {!isAuth ? (
            <Link to="/register">
              <button className="navbar-sign">Sign Up</button>
            </Link>
          ) : (
            <>
              <img
                className="nav-profile-image"
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  imageRendering: "-webkit-optimize-contrast" /* Safari */,
                  imageRendering: "optimizeQuality",
                  imageRendering: "pixelated" /* Modern Browsers */,
                  msInterpolationMode: "nearest-neighbor" /* IE */,
                  cursor: "pointer",
                }}
                src={user?.user_img}
                alt=""
                onClick={() => setshowLogout(!showLogout)}
              />
            </>
          )}
          {showLogout ? (
            <></>
          ) : (
            <>
              <div className="nav-profile-logout">
                <div className="nav-profile">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-person-circle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                    <path
                      fill-rule="evenodd"
                      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                    />
                  </svg>

                  <span
                    onClick={() => {
                      navigate("/profile");
                      setshowLogout(!showLogout);
                    }}
                  >
                    Profile
                  </span>
                </div>
                <div style={{ border: "none" }} className="nav-logout">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-box-arrow-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                    />
                  </svg>
                  <span
                    onClick={() => {
                      dispatch(logout());
                      navigate("/register");
                      setshowLogout(!showLogout);
                    }}
                  >
                    Logout
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
