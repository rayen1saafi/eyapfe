import React from "react";
import "../styles/pages-header.css";
import { Link, useLocation } from "react-router-dom";

const PagesHeader = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const pageTitle = pathSegments[1];
  const finalTitle = pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1);

  return (
    <>
      <div className="pages-header">
        <h3 style={{ color: "white" }}>{finalTitle}</h3>
        <div className="page-header-path">
          <div className="back"></div>
          <Link to="/">
            <span style={{ color: "#0d5ff9" }}>Home</span>
          </Link>

          <span style={{ color: "white" }}> / </span>
          <span style={{ color: "white" }}>{pageTitle}</span>
        </div>
        <svg className="svgare" fill="none" viewBox="0 0 279 416">
          <path
            fill-rule="evenodd"
            stroke="#0D5FF9"
            stroke-width="3"
            d="M109.755-38.798c33.905 36.978 10.442 93.21 19.059 142.218 9.073 51.606 27.114 80.839 0 125.08-27.292 44.529-62.477 54.631-114.663 62.005-53.094 7.503-112.908 37.432-155.043 3.451-41.916-33.803-18.759-98.921-28.438-151.421-10.342-56.091-57.129-112.778-29.34-161.951 28.69-50.767 97.898-59.728 156.705-63.423 54.331-3.414 114.658 3.619 151.72 44.041z"
            clip-rule="evenodd"
          ></path>
          <path
            fill-rule="evenodd"
            stroke="#0D5FF9"
            stroke-width="3"
            d="M135.755-23.798c33.905 36.978 10.442 93.21 19.059 142.218 9.073 51.606 27.114 80.839 0 125.08-27.292 44.529-62.477 54.631-114.663 62.005-53.094 7.503-112.908 37.432-155.043 3.451-41.916-33.803-18.759-98.921-28.438-151.421-10.342-56.091-57.129-112.778-29.34-161.951 28.69-50.767 97.898-59.728 156.705-63.423 54.331-3.414 114.658 3.619 151.72 44.041z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <svg className="svgare2" fill="none" viewBox="0 0 279 416">
          <path
            fill-rule="evenodd"
            stroke="#0D5FF9"
            stroke-width="3"
            d="M109.755-38.798c33.905 36.978 10.442 93.21 19.059 142.218 9.073 51.606 27.114 80.839 0 125.08-27.292 44.529-62.477 54.631-114.663 62.005-53.094 7.503-112.908 37.432-155.043 3.451-41.916-33.803-18.759-98.921-28.438-151.421-10.342-56.091-57.129-112.778-29.34-161.951 28.69-50.767 97.898-59.728 156.705-63.423 54.331-3.414 114.658 3.619 151.72 44.041z"
            clip-rule="evenodd"
          ></path>
          <path
            fill-rule="evenodd"
            stroke="#0D5FF9"
            stroke-width="3"
            d="M135.755-23.798c33.905 36.978 10.442 93.21 19.059 142.218 9.073 51.606 27.114 80.839 0 125.08-27.292 44.529-62.477 54.631-114.663 62.005-53.094 7.503-112.908 37.432-155.043 3.451-41.916-33.803-18.759-98.921-28.438-151.421-10.342-56.091-57.129-112.778-29.34-161.951 28.69-50.767 97.898-59.728 156.705-63.423 54.331-3.414 114.658 3.619 151.72 44.041z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </div>
    </>
  );
};

export default PagesHeader;
