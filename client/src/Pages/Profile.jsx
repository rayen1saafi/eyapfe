import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, updateuser, userCurrent } from "../redux/userSlice/userSlice";
import axios from "axios";

import "../styles/Profile.css";
import CoursCard from "../Components/CoursCard";
import CoursIProfile from "../Components/CoursIProfile";
const Profile = ({ setReloadPage, reloadPage }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setshow] = useState(false);
  //get current user with selector
  const user = useSelector((state) => state.user?.user);
  const [Editprofil, setEditprofil] = useState({});
  const [isVisible, setIsVisible] = useState();
  const [pingprofile, setpingprofile] = useState();
  const [showimg, setshowimg] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null); // State to store uploaded image
  const [showload, setshowload] = useState(false);
  useEffect(() => {
    dispatch(userCurrent());
  }, [pingprofile]);
  // function convertToBase64(e) {
  //   const reader = new FileReader();

  //   reader.readAsDataURL(e.target.files[0]);

  //   reader.onload = () => {
  //     // setimage(reader.result);
  //     setEditprofil({ ...Editprofil, user_img: reader.result });
  //     setshowimg(true);
  //   };

  //   reader.onerror = (error) => {
  //     console.log("Error", error);
  //   };
  // }
  const courses = useSelector((state) => state?.cours?.cours);

  // -------- upload profile image
  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setshowimg(true);
    const reader = new FileReader();

    reader.onload = () => {
      setUploadedImage(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const uploadProfileImage = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "fatmabouakazine");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dpu5n0ocs/upload",
        formData
      );
      console.log(response.data.secure_url);
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const deleteImage = () => {
    setEditprofil({ ...Editprofil, user_img: "" });
  };
  // Function to handle dispatching the edited file
  const handleFileEdit = async () => {
    try {
      const imageUrl = await uploadProfileImage();
      if (imageUrl) {
        const profileData = { ...Editprofil, user_img: imageUrl };

        dispatch(updateuser({ id: user._id, Editprofil: profileData }))

        setReloadPage(!reloadPage);
        setIsVisible(true);
        setTimeout(() => {
          setshowimg(false);

          setshowload(false);
        }, 200);
        setTimeout(() => {

          setIsVisible(null);
        }, 1500);
      } else {
        console.error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error submitting image:", error);
    }
  };
  const [showmore, setShowmore] = useState(false);

  // Filtered courses based on instructor_id or pack_id
  const filteredCourses = courses?.filter(
    (course) =>
      course?.instructor_id === user?._id || course?.pack_id === user?._id
  );
  // ---------- pagination --------------
    // Function to handle previous and next arrows for courses
    const [startIdx, setStartIdx] = useState(0);
    const coursesPerPage = 2;
    
    const handleNext = () => {
      setStartIdx(startIdx + coursesPerPage);
    };
  
    const handlePrevious = () => {
      setStartIdx(startIdx - coursesPerPage);
    };
    return (
    <>
      {user?.isActivated == true ? (
        <div className="profile">
          {showimg && (
            <div className="imagedisplay">
              <div className="img">
                {showload ? (
                  <>
                    {" "}
                    <div class="back"></div>
                    <div class="loader">
                      <span class="loader-text">loading</span>
                      <span class="load"></span>
                    </div>
                  </>
                ) : null}

                <img src={uploadedImage} alt="Uploaded" />
              </div>
              <div className="btns">
                <button
                  className="btn1"
                  onClick={() => {
                    handleFileEdit();
                    setshowload(true);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="35"
                    class="bi bi-check-lg"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
                  </svg>
                </button>
                <button className="btn2" onClick={() => setshowimg(false)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    class="bi bi-x-lg"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                  </svg>
                </button>
              </div>
            </div>
          )}
          {isVisible == true ? (
            <div
              class={
                isVisible == true ? "alert-box success1" : "alert-box success"
              }
            >
              Profile successfully updated !!!
            </div>
          ) : isVisible == false ? (
            <div
              class={
                isVisible == false ? "alert-box warning1" : "alert-box warning"
              }
            >
              Warning Alert !!!
            </div>
          ) : null}
        <div className="profile-detail-cours">
        <div className="userdetailles">
            <div className="cov">
              <img src="assets/cov.jpg" alt="" />
            </div>
            <div
              className="upload"
              onClick={() => document.getElementById("fileInput").click()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                class="bi bi-cloud-arrow-up-fill"
                viewBox="0 0 16 16"
              >
                <path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2m2.354 5.146a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0z" />
              </svg>
            </div>

            <div className="photoProfile">
              {user?.user_img ? (
                <img src={user?.user_img} alt="" />
              ) : (
                <img
                  src="https://media.istockphoto.com/id/1451587807/fr/vectoriel/vecteur-dic%C3%B4ne-de-profil-utilisateur-avatar-ou-ic%C3%B4ne-de-personne-photo-de-profil-symbole.jpg?s=612x612&w=0&k=20&c=hWdVW8_-dFwDctfVF0VXDH6TEnkMX9x6NkQhwWo2zTc="
                  alt=""
                />
              )}
            </div>

            <div className="content">
              {/* Add image upload input */}
              <input
                placeholder="Image"
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={handleFileChange}
              ></input>
              {/* <button className="pack-submit" onClick={handleFileEdit}>
                Submit
              </button> */}

              {/* Display uploaded image */}

              <h3>
                {user?.nom} {user?.prenom}
              </h3>
              <p>@{user?.username}</p>
              <p>{user?.email}</p>
              <div className="profile-phone">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone-forward" viewBox="0 0 16 16">
  <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877zm10.762.135a.5.5 0 0 1 .708 0l2.5 2.5a.5.5 0 0 1 0 .708l-2.5 2.5a.5.5 0 0 1-.708-.708L14.293 4H9.5a.5.5 0 0 1 0-1h4.793l-1.647-1.646a.5.5 0 0 1 0-.708"/>
</svg> 

{user?.phone == null ?  <p style={{color:"gray",marginBottom:"0"}}>+216 XX XXX XXX</p> :  <p style={{color:"gray",marginBottom:"0"}}>+216 {user?.phone}</p>
              }
              </div>
              <h4 style={{color:"gray",paddingTop:"10px"}}>{user?.role == "user" ? <>
              Student
              </> : <>
              {user?.role}
              </>}</h4>
             
             
            </div>
          </div>
          <div className="cours-list-profile">
            {filteredCourses
              ?.slice(startIdx, startIdx + coursesPerPage)
              .map((course) => (
                <CoursIProfile key={course._id} el={course} />
              ))}
            {filteredCourses?.length > coursesPerPage && (
              <div className="profile-navigation-arrows">
                {startIdx > 0 && (
                  <button onClick={handlePrevious}>&lt; </button>
                )}
                {startIdx + coursesPerPage < filteredCourses.length && (
                  <button onClick={handleNext}> &gt;</button>
                )}
              </div>
            )}
          </div>
        </div>
       
    
          <div className="userupdate">
            <div className="titre">
              <h3>Edit Profile</h3>
            </div>
            <div className="fullname">
              <div className="fullname_content">
                <label>UserName</label>
                <input
                  type="text"
                  defaultValue={user?.username}
                  placeholder="UserName"
                  onChange={(e) =>
                    setEditprofil({ ...Editprofil, username: e.target.value })
                  }
                />
              </div>
              <div className="fullname_content">
                <label>FirstName</label>
                <input
                  type="text"
                  defaultValue={user?.nom}
                  placeholder="firstName"
                  onChange={(e) =>
                    setEditprofil({ ...Editprofil, nom: e.target.value })
                  }
                />
              </div>
              <div className="fullname_content">
                <label>LastName</label>
                <input
                  type="text"
                  defaultValue={user?.prenom}
                  placeholder="LastName"
                  onChange={(e) =>
                    setEditprofil({ ...Editprofil, prenom: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="email_Phone">
              <div className="emailPhone_content">
                <label>Email</label>
                <input
                  type="text"
                  defaultValue={user?.email}
                  placeholder="Email"
                  onChange={(e) =>
                    setEditprofil({ ...Editprofil, email: e.target.value })
                  }
                />
              </div>
              <div className="emailPhone_content">
                <label>Phone</label>
                <input
                  type="text"
                  defaultValue={user?.phone}
                  placeholder="Phone"
                  onChange={(e) =>
                    setEditprofil({ ...Editprofil, phone: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="password">
              {!show ? (
                <svg
                  onClick={() => setshow(!show)}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-eye-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                </svg>
              ) : (
                <svg
                  onClick={() => setshow(!show)}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-eye-slash-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z" />
                  <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z" />
                </svg>
              )}
              <div className="password_content">
                <label>New Password</label>
                <input
                  type={show ? "text" : "password"}
                  placeholder="New Password"
                  onChange={(e) =>
                    setEditprofil({ ...Editprofil, password: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="description">
              <div className="description_content">
                <label>Desciprtion</label>
                <textarea
                  id="story"
                  placeholder="Description"
                  defaultValue={user.description}
                  onChange={(e) =>
                    setEditprofil({
                      ...Editprofil,
                      description: e.target.value,
                    })
                  }
                ></textarea>
              </div>
            </div>
            <div className="Update">
              <button
                onClick={async () => {
                  try {
                    // Assuming you have access to dispatch function via props or useDispatch hook
                    await dispatch(updateuser({ id: user._id, Editprofil }))
                    setReloadPage(!reloadPage)
                    setIsVisible(true);
                    setTimeout(() => {
                      setIsVisible();
                      setpingprofile(!pingprofile);
                    }, 1500);
                  } catch (error) {
                    setpingprofile(!pingprofile);
                    setIsVisible(false);
                    setTimeout(() => {
                      setIsVisible();
                      setpingprofile(!pingprofile);
                    }, 1500);
                  }
                }}
              >
                UPDATE PROFILE
              </button>
            </div>
          </div>
        </div>
      ) : user?.isActivated == false ? (
        <div className="validateaccount">
          <div className="validate-content">
            <span style={{ fontWeight: "600" }}>Hello {user?.username}.</span>

            <p>
              Your account is currently inactive. Please check your email for
              instructions on how to activate it.
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Profile;
