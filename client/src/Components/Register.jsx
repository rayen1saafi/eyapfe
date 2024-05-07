import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userRegister } from "../redux/userSlice/userSlice";
import "../styles/Register.css";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
const Register = ({ show, setShow }) => {
  const [register, setRegister] = useState({
    username: "",
    nom: "",
    prenom: "",
    email: "",
    password: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [lastnameError, setLastnameError] = useState("");
  const [firstnameError, setfirstnameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
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
        await dispatch(userRegister(register));

        navigate("/profile");
      } catch (error) {
        setEmailError("Email already exists");
      }
    }
  };

  return (
    <div className="register-main">
        <div className="register-left">
          <img src="/assets/login-img.png" alt="" />
        </div>
        <div className="register-right">
          <div className="register-right-container">
           
            <div className="register-center">
              <h2>Welcome to our website!</h2>
              <p>Please enter your details</p>
              <form onSubmit={(e) => e.preventDefault()}>
              <label style={{ color: "red" }}>{usernameError}</label>
              <input
          type="text"
          placeholder="Username"
          onChange={(e) =>
            setRegister({
              ...register,
              username: e.target.value,
            })
          }
        />
        <label style={{ color: "red" }}>{firstnameError}</label>
              <input
          type="text"
          placeholder="First Name"
          onChange={(e) =>
            setRegister({
              ...register,
              nom: e.target.value,
            })
          }
        />
        <label style={{ color: "red" }}>{lastnameError}</label>
              <input
          type="text"
          placeholder="Last Name"
          onChange={(e) =>
            setRegister({
              ...register,
              prenom: e.target.value,
            })
          }
        />
        <label style={{ color: "red" }}>{emailError}</label>
                 <input
          type="email"
          placeholder="Email"
          onChange={(e) =>
            setRegister({
              ...register,
              email: e.target.value,
            })
          }
        />
                <div className="pass-input-div">
                <label style={{ color: "red" }}>{passwordError}</label>
                  {showPassword ?          <input
          type="text"
          placeholder="Password"
          onChange={(e) =>
            setRegister({
              ...register,
              password: e.target.value,
            })
          }
        /> :         <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setRegister({
            ...register,
            password: e.target.value,
          })
        }
      />}
        
                  {showPassword ? (
                    <FaEyeSlash
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                    />
                  ) : (
                    <FaEye
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                    />
                  )}
                </div>
            
                <div className="register-center-buttons">
                <button
          className="submit"
          onClick={handleRegister} // Appel à la fonction handleRegister
        >
          Register
        </button>
                </div>
              </form>
            </div>

            <p className="login-bottom-p">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
  );
};

export default Register;
