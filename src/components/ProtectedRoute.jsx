import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/UserContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuthContext();
  const location = useLocation();

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
