import React, { useState } from "react";
import "../styles/Registerlogin.css";
import Register from "../Components/Register";
import Login from "../Components/Login";
import PagesHeader from "../Components/PagesHeader";
const LoginPage = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <PagesHeader />
      <div className="Registerlogin">
        <Login />
      </div>
    </>
  );
};

export default LoginPage;
