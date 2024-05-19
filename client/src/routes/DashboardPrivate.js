import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
const DashboardPrivate = () => {
  const isAuth = localStorage.getItem("token");
  const user = useSelector((state) => state?.user?.user);

  return isAuth && user?.role == "admin" ? <Outlet /> : <Navigate to="/" />;
};
export default DashboardPrivate;
