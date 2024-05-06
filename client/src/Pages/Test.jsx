import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createFile, getFile } from "../redux/fileSlice/fileSlice";
import axios from "axios";

const Test = () => {
  const [newContent, setNewContent] = useState({});
  const [fileContent, setFileContent] = useState({
    lesson_id: "",
    titre: "",
    file: null,
    file_type: "",
  });
  const dispatch = useDispatch();
  const files = useSelector((state) => state?.file?.files);

  useEffect(() => {
    dispatch(getFile());
  }, [dispatch]);

  const handleChange = (e) => {
    setFileContent({ ...fileContent, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFileContent({ ...fileContent, file: selectedFile });
    
    // Check if the selected file is an image or video
    const fileType = selectedFile.type.split('/')[0]; // Get the first part of MIME type
    if (fileType === 'image' || fileType === 'video') {
      uploadFile(selectedFile); // Upload the file to Cloudinary
    } else {
      convertToBase64(selectedFile); // Convert the file to base64
    }
  };

  const uploadFile = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "fatmabouakazine");

      const response = await axios.post("https://api.cloudinary.com/v1_1/dpu5n0ocs/upload", formData);
      const fileUrl = response.data.secure_url;
      setFileContent({ ...fileContent, file_type: fileUrl }); // Set Cloudinary URL
    } catch (error) {
      console.error("Error uploading file:", error.response.data);
    }
  };

  const convertToBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setFileContent({ ...fileContent, file_type: reader.result }); // Set base64 data
    };
    reader.onerror = (error) => {
      console.error("Error", error);
    };
  };

  const handleSubmit = async () => {
    try {
      await dispatch(createFile(fileContent));
      console.log("File uploaded successfully.");
    } catch (error) {
      console.error("Error handling submit:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        name="lesson_id"
        value={fileContent.lesson_id}
        onChange={handleChange}
      />
      <input
        type="text"
        name="titre"
        value={fileContent.titre}
        onChange={handleChange}
      />
      <input type="file" accept="image/*, video/*" onChange={handleFileChange} />
      <button onClick={handleSubmit}>Add File</button>

      {/* Displaying files from the files array */}
   
     {/* Displaying files from the files array */}
     {files &&
      files?.map((file, index) => (
        <div key={index}>
          <p>Lesson ID: {file.lesson_id}</p>
          <p>Titre: {file.titre}</p>
          {/* <p>File Type: {file.file_type}</p> */}
          {file.file_type.endsWith(".png") || file.file_type.endsWith(".jpg") || file.file_type.endsWith(".jpeg") ? (
            <img src={file.file_type} alt={`File ${index}`} />
          ) : file.file_type.endsWith(".mp4") ? (
            <video src={file.file_type} controls></video>
          ) : file.file_type.startsWith("data:") ? (
            <iframe src={file.file_type} style={{ width: "100%", height: "700px" }} title={`File ${index}`} />
          ) : (
            <p>Unsupported file type</p>
          )}
        </div>
      ))}
          </div>
    
   
  );
};

export default Test;
