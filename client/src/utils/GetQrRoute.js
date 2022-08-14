import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../customHooks/useAuth";

const PriveteRoute = () => {
  const { user } = useAuth();

  if (user === "LOGIN") {
    return <Navigate to="/login" />;
  }

  if (user === "LOADING" || user === "GET_QR") {
    return <Outlet />;
  }

  if (user === "CONNECTED") {
    return <Navigate to="/" />;
  }
};

export default PriveteRoute;
