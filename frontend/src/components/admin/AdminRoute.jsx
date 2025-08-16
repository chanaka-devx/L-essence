import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../context/useAuth";

const AdminRoute = () => {
  const { user } = useAuth();
  // Check if user is logged in AND has admin role
  if (!user) {
    return <Navigate to="/login" />; // not logged in
  }

  if (user.role === "customer") {
    return <Navigate to="/" />; // logged in but not admin
  }
  return <Outlet />;
};

export default AdminRoute;
