import React, { useState } from "react";
import "../styles/Registerlogin.css";
import Register from "../Components/Register";
import Login from "../Components/Login";
const Registerlogin = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="Registerlogin">
      <div className="registerLgin-Content">
        <div className={show ? "imageanime" : "imageanime1"}>
          <img
            src="https://img.freepik.com/photos-gratuite/tudiant-cours-distance-ligne-assis-canape_23-2148552269.jpg?t=st=1709731781~exp=1709735381~hmac=af76483436aa8b119b8cb68e70241dad9effda04ae59859013ac5bdecf1dbcfc&w=360"
            alt=""
          />
        </div>
        <div className="registerLgincontainer">
          <Login setShow={setShow} show={show} />
        </div>
        <div className="registerLgincontainer">
          <Register setShow={setShow} show={show} />
        </div>
      </div>
    </div>
  );
};

export default Registerlogin;
