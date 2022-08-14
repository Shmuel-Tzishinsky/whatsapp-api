import { combineReducers } from "redux";

import qrCode from "./qrCode";
import user from "./user";
import chatScreen from "./chat-screen";
import chatContacts from "./chat-contacts";

export default combineReducers({
  qrCode: qrCode,
  userData: user,
  chatScreen: chatScreen,
  chatContacts: chatContacts,
});
