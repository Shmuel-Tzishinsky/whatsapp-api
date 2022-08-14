import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../customHooks/useAuth";

const PriveteRoute = () => {
  const { user } = useAuth();

  if (user === "LOGIN") {
    return <Navigate to="/login" />;
  }
  if (user === "LOADING") {
    return <Navigate to="/loading-connection" />;
  }
  if (user === "GET_QR") {
    return <Navigate to="/whatsapp-connection" />;
  }
  if (user === "CONNECTED") {
    return <Outlet />;
  }
};

export default PriveteRoute;
