import { Navigate, useLocation } from "react-router";

const AuthRoute = ({
  children,
  type = "private",
  allowedRoles = ["admin", "user"],
}) => {
  const isAuthenticated = null;
  const role = null;
  const location = useLocation();

  if (type === "private") {
    return isAuthenticated ? (
      children
    ) : (
      <Navigate to="/login" state={{ from: location }} replace />
    );
  }

  if (type === "role") {
    if (!isAuthenticated)
      return <Navigate to="/login" state={{ from: location }} replace />;
    if (!allowedRoles?.includes(role))
      return <Navigate to="/unauthorized" replace />;
    return children;
  }
};

export default AuthRoute;
