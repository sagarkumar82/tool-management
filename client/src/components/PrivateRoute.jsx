import { Outlet, Navigate } from "react-router-dom";

function PrivateRoute() {
  const auth = localStorage.getItem('auth');

  return auth ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PrivateRoute;
