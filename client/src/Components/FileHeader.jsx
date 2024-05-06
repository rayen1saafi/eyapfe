import React from "react";
import "../styles/pages-header.css";
import { Link, useLocation } from "react-router-dom";

const FileHeader = ({ file }) => {
  return (
    <>
      <div className="pages-header">
        <h3>{file.titre}</h3>
        <div className="page-header-path">
          <Link to="/">
            <span>File</span>
          </Link>

          <span> / </span>
          <span style={{ color: "#0175CD" }}>{file.titre}</span>
        </div>
        <img className="shape_7" src="/assets/shape_7.png" alt="" />
        <img className="shape_8" src="/assets/shape_8.png" alt="" />
      </div>
    </>
  );
};

export default FileHeader;
