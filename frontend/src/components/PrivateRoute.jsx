import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../context/useAuth";

const PrivateRoute = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/userlogin" />; // not logged in
  return <Outlet />;
};

export default PrivateRoute;
