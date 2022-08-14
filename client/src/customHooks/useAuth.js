import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadSocket } from "../socket/socketConnection";

function useAuth() {
  const { userToken, userID } = useSelector((state) => state.userData);
  const { chatList, qrCode } = useSelector((state) => state.qrCode);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, serUser] = useState(); // UNDEFINED || LOGIN || LOADING || GET_QR || CONNECTED

  useEffect(() => {
    if (!userID || !userToken) {
      return serUser("LOGIN");
    }

    if (!qrCode && (typeof chatList !== "object" || chatList === null)) {
      loadSocket(chatList, dispatch, userID, navigate);
      return serUser("LOADING");
    }

    if (qrCode) {
      return serUser("GET_QR");
    }

    if (chatList) {
      return serUser("CONNECTED");
    }
  }, []);

  return {
    user,
  };
}

export default useAuth;
