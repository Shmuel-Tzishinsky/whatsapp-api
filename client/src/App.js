import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Safe Route
import AuthRoute from "./utils/AuthRoute";
import PriveteRoute from "./utils/PriveteRoute";
import GetQrRoute from "./utils/GetQrRoute";

// Pages
import Login from "./pages/auth/Login/Login";
import SingUp from "./pages/auth/SingUp/SingUp";
import SendResetPassword from "./pages/auth/SendResetPassword/SendResetPassword";
import ChangePassword from "./pages/auth/ChangePassword/ChangePassword";
import WhatsappConnection from "./pages/auth/WhatsappConnection/WhatsappConnection";
import LoadingWhatsapp from "./pages/auth/LoadingWhatsapp/LoadingWhatsapp";
import Chats from "./pages/Chats/Chats";
// import Home from "./components/home/Home.js";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Privete route */}
          <Route element={<PriveteRoute />}>
            <Route path="/" element={<Chats />} exact />
          </Route>

          {/* Route only if user d'ont login yet */}
          <Route element={<AuthRoute />}>
            <Route path="/login" element={<Login />} exact />
            <Route path="/sing-up" element={<SingUp />} exact />
            <Route path="/send-reset-password" element={<SendResetPassword />} exact />
          </Route>

          {/* GetQrRoute route */}
          <Route element={<GetQrRoute />}>
            <Route path="/loading-connection" element={<LoadingWhatsapp />} exact />
            <Route path="/whatsapp-connection" element={<WhatsappConnection />} exact />
          </Route>

          {/* Global route */}
          <Route path="/change-password/:email/:resetToken" element={<ChangePassword />} exact />
          <Route path="*" element={<h1>404</h1>} exact />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
