import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../redux/userSlice/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = ({ show, setShow }) => {
  const user = useSelector((state) => state?.user?.user);
  const users = useSelector((state) => state.user?.users);

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [userRole, setUserRole] = useState(""); // Declare userRole state

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
    <div className="registerLogin_box">
      <form onSubmit={(e) => e.preventDefault()}>
        <h1>SIGN IN</h1>
        {error ? (
          <label style={{ color: "red" }}>{error}</label>
        ) : (
          <label
            style={{ color: "transparent", backgroundColor: "transparent" }}
          >
            ffff
          </label>
        )}
        <label>Email:</label>
        <input
          type="email"
          placeholder="EMAIL"
          value={login.email}
          onChange={(e) => setLogin({ ...login, email: e.target.value })}
        />
        <label>Password:</label>
        <input
          type="password"
          placeholder="PASSWORD"
          value={login.password}
          onChange={(e) => setLogin({ ...login, password: e.target.value })}
        />
        <button
          className="submit"
          onClick={() => {
            setTimeout(() => {
              userRole !== "admin" ? handleLogin() : handleLoginDashbord();
            }, 1500); // Adjust the delay duration as needed (2500 milliseconds = 2.5 seconds)
          }}
        >
          Login
        </button>

        <h5>
          You don't have an account?{" "}
          <span style={{ color: "#0175CD" }} onClick={() => setShow(!show)}>
            Sign up
          </span>
        </h5>
        <h5>
          Forgot your password?{" "}
          <Link
            to="/forgotpassword"
            style={{ color: "#0175CD", textDecoration: "none" }}
          >
            Reset password
          </Link>
        </h5>
      </form>
    </div>
  );
};

export default Login;
