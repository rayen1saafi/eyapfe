import React, { useState } from "react";
import "../styles/AddFileModal.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updatFile } from "../redux/fileSlice/fileSlice";

const UpdateFileModal = ({
  el,
  setmodelUpdate,
  modelUpdate,
  reloadPage,
  setReloadPage,
  setopenUpdateModale,
}) => {
  const [fileContent, setFileContent] = useState({
    titre: el?.titre || "",
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFileContent({ ...fileContent, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFileContent({ ...fileContent, file: selectedFile });

    const fileType = selectedFile.type.split("/")[0];
    setFileContent({ ...fileContent, file_type: fileType });

    if (fileType === "image" || fileType === "video") {
      uploadFile(selectedFile);
    } else {
      convertToBase64(selectedFile);
    }
  };

  const uploadFile = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "fatmabouakazine");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dpu5n0ocs/upload",
        formData
      );
      const fileUrl = response.data.secure_url;
      setFileContent({ ...fileContent, file: fileUrl });
    } catch (error) {
      console.error("Error uploading file:", error.response.data);
    }
  };

  function convertToBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setFileContent({ ...fileContent, file: reader.result });
    };
    reader.onerror = (error) => {
      console.log("Error", error);
    };
  }
  const [reloadIcone, setreloadIcone] = useState(false);

  const handleUpdate = async () => {
    try {
      await dispatch(updatFile({ id: el._id, file: fileContent }));
      console.log("File uploaded successfully.");
      setTimeout(() => {
        setreloadIcone(false);

        setopenUpdateModale(false);
      }, 2500);

      setReloadPage(!reloadPage);
    } catch (error) {
      console.error("Error handling submit:", error);
    }
  };

  return (
    <div className="create-File-modal">
      <div className="create-File-modal-container">
        <div className="create-File-modal-content">
          <div className="c-File-m-title">
            <div className="modale-title">
              <h2>update File Form</h2>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-x-lg"
              viewBox="0 0 16 16"
              onClick={() => {
                setopenUpdateModale(false);
              }}
            >
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
            </svg>
          </div>
          <div className="File-modal-content">
            <h3>Title : </h3>
            <input
              type="text"
              name="titre"
              value={fileContent.titre}
              defaultValue={el.titre}
              onChange={handleChange}
            />
            <h3>file Type :</h3>
            {/* <input
              type="text"
              name="file_type"
              value={fileContent.file_type}
              onChange={handleChange}
            /> */}
            <select
              onChange={(e) =>
                setFileContent({ ...fileContent, file_type: e.target.value })
              }
              value={fileContent.file_type}
            >
              <option value="">--Please choose an option--</option>
              <option value="image">Image</option>
              <option value="video">Video</option>
              <option value="pdf">pdf</option>
            </select>
            <h3>file</h3>
            <input type="file" onChange={handleFileChange} />
          </div>
          <div className="File-modal-button">
          {reloadIcone == true ? (
              <div class="dot-spinner">
                <div class="dot-spinner__dot"></div>
                <div class="dot-spinner__dot"></div>
                <div class="dot-spinner__dot"></div>
                <div class="dot-spinner__dot"></div>
                <div class="dot-spinner__dot"></div>
                <div class="dot-spinner__dot"></div>
                <div class="dot-spinner__dot"></div>
                <div class="dot-spinner__dot"></div>
              </div>
            ) : null}
            <button
              className="File-close"
              onClick={() => setopenUpdateModale(false)}
            >
              Close
            </button>
            <button
              className="File-submit"
              onClick={() => {
                setreloadIcone(true);

                setTimeout(() => {
                  handleUpdate();
                }, 2000);
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateFileModal;
