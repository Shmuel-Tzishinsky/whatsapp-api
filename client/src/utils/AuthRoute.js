import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../customHooks/useAuth";

const AuthRoute = () => {
  const { user } = useAuth();

  if (user === "LOGIN") {
    return <Outlet />;
  }

  if (user === "LOADING") {
    return <Navigate to="/loading-connection" />;
  }

  if (user === "GET_QR") {
    return <Navigate to="/whatsapp-connection" />;
  }

  if (user === "CONNECTED") {
    return <Navigate to="/" />;
  }
};

export default AuthRoute;
