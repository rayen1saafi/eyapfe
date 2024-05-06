import React from "react";
import { useParams } from "react-router-dom";
import "../styles/FileDetails.css";
import { useSelector } from "react-redux";
import FileHeader from "../Components/FileHeader";

const FileDetails = () => {
  const { file_id } = useParams();
  const files = useSelector((state) => state?.file?.files);

  return (
    <div className="filedetails">
      {files
        ?.filter((file) => file._id === file_id)
        .map((file) => (
          <>
            <FileHeader file={file} />
            {file.file_type === "image" && (
              <div className="detailsimg" key={file._id}>
                <img className="img" src={file.file} alt="Image" />
              </div>
            )}
            {file.file_type === "video" && (
              <div className="details" key={file._id}>
                <video controls width="250">
                  <source src={file.file} />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
            {file.file_type === "pdf" && (
              <div className="details" key={file._id}>
                <iframe
                  src={file.file}
                  title={file.titre}
                  style={{ width: "100%", height: "1100px" }}
                />
              </div>
            )}
            {/* Add more conditions for other file types if needed */}
          </>
        ))}
    </div>
  );
};

export default FileDetails;
