import { Navigate, Outlet } from "react-router-dom";
const LoginPrivateRoutes = () => {
  const isAuth = localStorage.getItem("token");

  return !isAuth ? <Outlet /> : <Navigate to="/" />;
};
export default LoginPrivateRoutes;
