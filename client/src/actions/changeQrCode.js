import * as types from "../constants/ActionTypes";

export const getQr = () => (dispatch) => {
  return dispatch({
    type: types.WHATSAPP_START,
  });
};

// update new message in state
export const updateMessage = (msg) => (dispatch) => {
  // const { body, from } = msg.msg;
  return dispatch({
    type: types.UPDATE_MSG_IN_CHAT,
    data: msg,
  });
};

// update new message in state
export const suerSelectChat = (chat) => (dispatch) => {
  return dispatch({
    type: types.LOAD_MESSAGES_IN_SELECT_CHAT,
    messages: chat ? chat?.messages : [],
  });
};

// Load Chat end contacts
export const loadReady = (navigate, data) => (dispatch) => {
  dispatch({
    type: types.WHATSAPP_QR_SUCCESS,
    data: {
      chat: data.chat,
      contacts: data.contacts,
      clientInfo: data.clientInfo,
    },
  });
  navigate("/");
};

// Loading media end profile pics to contacts
export const loadMediaInitial = (data) => (dispatch) => {
  dispatch({
    type: types.LOAD_PROFIL_PIC,
    data: data,
  });
};

// Add qr
export const addQR = (qr, navigate) => (dispatch) => {
  dispatch({
    type: types.WHATSAPP_QR_SUCCESS,
    data: qr,
  });
  navigate("/whatsapp-connection");
};

// client is disconnected
export const clientDisconnected = () => (dispatch) => {
  dispatch({
    type: types.WHATSAPP_START,
  });
  window.location.href = "/loading-connection";
};

// sever is download the media (video || img)
export const serverDownloadMedia = (media, msgID, chatID) => (dispatch) => {
  dispatch({
    type: types.SERVER_DOWNLOAD_MEDIA,
    chatID,
    media,
    msgID,
  });
};
