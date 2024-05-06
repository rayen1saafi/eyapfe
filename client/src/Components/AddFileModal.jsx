import React, { useEffect, useState } from "react";
import "../styles/AddFileModal.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { createFile } from "../redux/fileSlice/fileSlice";

const AddFileModal = ({
  e,
  setshowModel,
  showmodel,
  reloadPage,
  setReloadPage,
}) => {
  const [fileContent, setFileContent] = useState({
    lesson_id: "",
    titre: "",
    file: null,
    file_type: "",
  });

  useEffect(() => {
    setFileContent((prev) => ({
      ...prev,
      lesson_id: e._id,
    }));
  }, [e._id]);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFileContent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFileContent((prev) => ({
      ...prev,
      file: selectedFile,
    }));

    const fileType = selectedFile.type.split("/")[0];
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
      setFileContent((prev) => ({
        ...prev,
        file: fileUrl,
      }));
    } catch (error) {
      console.error("Error uploading file:", error.response.data);
    }
  };

  function convertToBase64(e) {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setFileContent({ ...fileContent, file: reader.result });
    };
    reader.onerror = (error) => {
      console.log("Error", error);
    };
  }

  const handleSubmit = async () => {
    try {
      await dispatch(createFile(fileContent));
      console.log("File uploaded successfully.");
      setReloadPage(!reloadPage);
      setshowModel(false);
    } catch (error) {
      console.error("Error handling submit:", error);
    }
  };

  const [reloadIcone, setreloadIcone] = useState(false);

  return (
    <div className="create-File-modal">
      <div className="create-File-modal-container">
        <div className="create-File-modal-content">
          <div className="c-File-m-title">
            <div className="modale-title">
              <h2>Add File Form</h2>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-x-lg"
              viewBox="0 0 16 16"
              onClick={() => {
                setshowModel(!showmodel);
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
              onChange={handleChange}
            />
            <h3>file Type :</h3>
            <select
              onChange={(e) =>
                setFileContent({ ...fileContent, file_type: e.target.value })
              }
            >
              <option value="">--Please choose an option--</option>
              <option value="image">Image</option>
              <option value="video">Video</option>
              <option value="pdf">pdf</option>
            </select>
            {fileContent.file_type === "image" ||
            fileContent.file_type === "video" ? (
              <>
                <h3>file</h3>
                <input
                  type="file"
                  accept="image/*, video/*"
                  onChange={handleFileChange}
                />
              </>
            ) : (
              <>
                <h3>file</h3>
                <input
                  type="file"
                  onChange={(e) => {
                    convertToBase64(e);
                  }}
                />
              </>
            )}
          </div>
          <div className="File-modal-button">
            {reloadIcone && (
              <div className="dot-spinner">
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
              </div>
            )}

            <button className="File-close" onClick={() => setshowModel(false)}>
              Close
            </button>
            <button
              className="File-submit"
              onClick={() => {
                setreloadIcone(true);
                handleSubmit(); // Call handleSubmit directly here
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

export default AddFileModal;
