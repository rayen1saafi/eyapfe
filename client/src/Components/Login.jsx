import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../redux/userSlice/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import "../styles/login.css"
const Login = ({ show, setShow }) => {
  const user = useSelector((state) => state?.user?.user);
  const users = useSelector((state) => state.user?.users);

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [userRole, setUserRole] = useState(""); // Declare userRole state
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setError("");

      const response = await dispatch(userLogin(login));

      if (response.payload.token) {
        navigate("/profile");
      }
    } catch (error) {
      setError("Email or password incorrect.");

      console.error("Login error:", error);
    }
  };

  const handleLoginDashbord = async () => {
    try {
      setError("");

      const response = await dispatch(userLogin(login));

      if (response.payload.token) {
        navigate("/dashbord/learner");
      }
    } catch (error) {
      setError("Email or password incorrect.");

      console.error("Login error:", error);
    }
  };
  //get role for every one
  // Set userRole when email matches
  useEffect(() => {
    users?.forEach((el) => {
      if (login?.email === el.email) {
        setUserRole(el.role);
      }
    });
  }, [login.email, users]);

  return (
    <div className="login-main">
    <div className="login-left">
      <img src="/assets/login-img.png" alt="" />
    </div>
    <div className="login-right">
      <div className="login-right-container">
        
        <div className="login-center">
          <h2>Welcome back!</h2>
          <p>Please enter your details</p>
          {error ? (
          <label style={{ color: "red" }}>{error}</label>
        ) : (
          <label
            style={{ color: "transparent", backgroundColor: "transparent" }}
          >
            error
          </label>
        )}
          <form onSubmit={(e) => e.preventDefault()}>
          <input
      type="email"
      placeholder="EMAIL"
      value={login.email}
      onChange={(e) => setLogin({ ...login, email: e.target.value })}
    />                <div className="pass-input-div">
           {!showPassword ?      <input
      type="password"
      placeholder="PASSWORD"
      value={login.password}
      onChange={(e) => setLogin({ ...login, password: e.target.value })}
    /> :     <input
    type="text"
    placeholder="PASSWORD"
    value={login.password}
    onChange={(e) => setLogin({ ...login, password: e.target.value })}
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

            <div className="login-center-options">
              <div className="remember-div"></div>
              <a href="#" className="forgot-pass-link">
             
      Forgot your password?{" "}
      <Link
        to="/forgotpassword"
        style={{ color: "#0175CD", textDecoration: "none" }}
      >
        Reset password
      </Link>
   
              </a>
            </div>
            <div className="login-center-buttons">
            <button
          onClick={() => {
            setTimeout(() => {
              userRole !== "admin" ? handleLogin() : handleLoginDashbord();
            }, 1500); // Adjust the delay duration as needed (2500 milliseconds = 2.5 seconds)
          }}
        >
          Login
        </button>            </div>
     
          </form>
        </div>

        <p className="login-bottom-p">
          Don't have an account? <Link style={{color:'black'}} to="/Register">SignUp</Link>
        </p>
      </div>
    </div>
  </div>
  );
};

export default Login;
