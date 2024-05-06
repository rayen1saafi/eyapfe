import React, { useState } from "react";
import "../styles/create-Instructor-modal.css";
import { addInstructor } from "../redux/userSlice/userSlice";
import { useDispatch } from "react-redux";

const CreateInstructorModal = ({
  setopenModale,
  setIsVisible,
  reloadPage,
  setReloadPage,
}) => {
  const [show, setshow] = useState(false);
  const [register, setRegister] = useState({
    username: "",
    nom: "",
    prenom: "",
    email: "",
    password: "",
    role: "Instructor",
  });
  const [passwordError, setPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [lastnameError, setLastnameError] = useState("");
  const [firstnameError, setfirstnameError] = useState("");
  const [emailError, setEmailError] = useState("");

  const dispatch = useDispatch();

  const handleRegister = async () => {
    if (register.password?.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
    } else {
      setPasswordError("");
    }
    if (register.username == "") {
      setUsernameError("Username is required.");
    } else {
      setUsernameError("");
    }
    if (register.prenom == "") {
      setLastnameError("Lastname is required.");
    } else {
      setLastnameError("");
    }
    if (register.nom == "") {
      setfirstnameError("Firstname is required.");
    } else {
      setfirstnameError("");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(register.email)) {
      setEmailError("Email is incorrect.");
    } else {
      setEmailError("");
    }
    if (
      register.password?.length >= 6 &&
      register.username != "" &&
      register.nom != "" &&
      register.prenom != "" &&
      emailRegex.test(register.email)
    ) {
      try {
        await dispatch(addInstructor(register));
        setopenModale(false);
        setIsVisible(true);
        setReloadPage(!reloadPage);
        setTimeout(() => {
          setIsVisible();
        }, 5000);
      } catch (error) {
        setEmailError("Email already exists");
        setIsVisible(false);
        setTimeout(() => {
          setIsVisible();
        }, 5000);
      }
    }
  };
  return (
    <>
      {" "}
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="create-Instructor-modal">
          <div className="create-Instructor-modal-container">
            <div className="create-Instructor-modal-content">
              <div className="c-Instructor-m-title">
                <div className="modale-title">
                  <h2>Instructors Form</h2>
                </div>
                <svg
                  onClick={() => setopenModale(false)}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-x-lg"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                </svg>
              </div>
              <div className="Instructor-modal-content">
                <h3>
                  User Name :{" "}
                  <label style={{ color: "red" }}>{usernameError}</label>
                </h3>
                <input
                  className="Instructor-modale-name"
                  type="text"
                  placeholder="UserName"
                  id=""
                  onChange={(e) =>
                    setRegister({
                      ...register,
                      username: e.target.value,
                    })
                  }
                />
                <h3>
                  FirstName :{" "}
                  <label style={{ color: "red" }}>{firstnameError}</label>
                </h3>
                <input
                  className="Instructor-modale-name"
                  type="text"
                  placeholder="FirstName"
                  id=""
                  onChange={(e) =>
                    setRegister({
                      ...register,
                      nom: e.target.value,
                    })
                  }
                />
                <h3>
                  LastName:{" "}
                  <label style={{ color: "red" }}>{lastnameError}</label>
                </h3>
                <input
                  className="Instructor-modale-name"
                  type="text"
                  placeholder="LastName"
                  id=""
                  onChange={(e) =>
                    setRegister({
                      ...register,
                      prenom: e.target.value,
                    })
                  }
                />
                <h3>
                  Email: <label style={{ color: "red" }}>{emailError}</label>
                </h3>
                <input
                  className="Instructor-modale-name"
                  type="text"
                  placeholder="Email"
                  id=""
                  onChange={(e) =>
                    setRegister({
                      ...register,
                      email: e.target.value,
                    })
                  }
                />
                <div className="pass">
                  {!show ? (
                    <svg
                      onClick={() => setshow(!show)}
                      className="svg"
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
                      className="svg"
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
                  <h3>
                    Password:{" "}
                    <label style={{ color: "red" }}>{passwordError}</label>
                  </h3>
                  <input
                    className="Instructor-modale-name"
                    type={!show ? "password" : "text"}
                    placeholder="Password"
                    id=""
                    onChange={(e) =>
                      setRegister({
                        ...register,
                        password: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="Instructor-modal-button">
                <button
                  className="Instructor-close"
                  onClick={() => setopenModale(false)}
                >
                  Close
                </button>
                <button className="Instructor-submit" onClick={handleRegister}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateInstructorModal;
