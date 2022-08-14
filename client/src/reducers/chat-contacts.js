import * as types from "../constants/ActionTypes";

const initialState = {
  id: 0,
  name: "",
  index: "",
  avatar: "",
  lastMessage: "",
  timeLastMessage: "",
  lastSeen: "",
  isGroup: !1,
  pinned: undefined,
  mute: undefined,
  unreadMessages: undefined,
  openMedia: "",
  chatID: undefined,
};

const variable = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CONTACTS_DATA:
      return { ...state };

    case types.TOGGEL_OPEN_MEDIA:
      return { ...state, openMedia: action.payload };

    case types.SET_CONTACTS_DATA:
      return {
        ...state,
        id: action.payload.id,
        name: action.payload.name,
        index: action.payload.index,
        avatar: action.payload.avatar,
        lastMessage: action.payload.lastMessage,
        timeLastMessage: action.payload.timeLastMessage,
        lastSeen: action.payload.lastSeen,
        isGroup: action.payload.isGroup,
        pinned: action.payload.pinned,
        mute: action.payload.mute,
        unreadMessages: action.payload.unreadMessages,
        chatID: action.payload.serialized,
      };

    default:
      return state;
  }
};

export default variable;
