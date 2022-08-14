import { io } from "socket.io-client";
import {
  getQr,
  addQR,
  loadReady,
  suerSelectChat,
  updateMessage,
  loadMediaInitial,
  clientDisconnected,
  serverDownloadMedia,
} from "../actions/changeQrCode";

export const socket = io.connect(process.env.REACT_APP_SERVER_URL, {
  auth: {
    token: localStorage.getItem("userToken"),
    data: localStorage.getItem("userID"),
  },
  forceNew: true,
});

export const loadSocket = (chatList, dispatch, userID, navigate) => {
  if (!chatList) {
    dispatch(getQr());

    // Try connecting to a socket server 2 more times
    let num = 0;
    socket.on("connect", (e) => {
      if (num < 2) {
        socket.connect();
        num++;
      }
    });

    socket.on("authenticated", function (data) {
      console.log("🚀 ~ file: socketConnection.js ~ line 26 ~ data", data);
      console.log("user authenticated");
    });

    socket.on(`get-qr-${userID}`, (qr) => dispatch(addQR(qr, navigate)));

    socket.on(`ready-${userID}`, (data) => {
      data.contacts = data.contacts.filter((cont) => cont.isMyContact);
      dispatch(loadReady(navigate, data));
    });
    socket.on(`profile-pic-url-${userID}`, (data) => {
      console.log("🚀 ~ file: socketConnection.js ~ line 32 ~ socket.on ~ data", data);
      dispatch(loadMediaInitial(data));
    });
    socket.on(`msg-${userID}`, (msg) => {
      dispatch(updateMessage(msg));
    });

    socket.on(`user-select-chat-${userID}`, (chat) => dispatch(suerSelectChat(chat)));

    socket.on("disconnect", (e) => {
      console.log("disconnect", e);
      disconnectSocket(10000);
    });

    socket.on(`client-disconnected-${userID}`, (e) => {
      dispatch(clientDisconnected(navigate));
    });

    socket.on(`server-download-media-${userID}`, ({ media, msgID, chatID }) => {
      // console.log(media, msgID);
      dispatch(serverDownloadMedia(media, msgID, chatID));
    });

    disconnectSocket(10000);
  }
};

function disconnectSocket(time) {
  setTimeout(() => {
    if (!socket.connected) {
      socket.disconnect();
      console.log("disconnects");
      alert("Error: The server is not connected, refreshed the page to fixed");
    }
  }, time);
}

export const userSelectChat = (data) => {
  socket.emit(`user-select-chat-${localStorage.getItem("userID")}`, {
    chatID: data.serialized,
  });
};

// Emit message (only text)
export const sendMessage = (from, body) => {
  socket.emit(`send-message-${localStorage.getItem("userID")}`, {
    msg: {
      from,
      body,
    },
  });
};

// downloading media (when user choose one)
export const downloadMedia = (chatID, msgID) => {
  socket.emit(`download-media-${localStorage.getItem("userID")}`, {
    chatID,
    msgID,
  });
};
