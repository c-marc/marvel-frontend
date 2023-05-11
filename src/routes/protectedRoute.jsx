import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../components/authProvider";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <>{children ? children : <Outlet />}</>;
};

export default ProtectedRoute;
