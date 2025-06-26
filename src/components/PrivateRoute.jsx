import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Guards a route so that only authenticated and registered clients can access it.
 * - If not logged in ⇒ redirect to /auth
 * - If logged in but not registered ⇒ redirect to /unauthorized
 */
export default function PrivateRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  // not authenticated
  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // authenticated but not a registered client
  if (!user.isRegisteredClient) {
    return <Navigate to="/unauthorized" replace />;
  }

  // authenticated and registered
  return <>{children}</>;
}
