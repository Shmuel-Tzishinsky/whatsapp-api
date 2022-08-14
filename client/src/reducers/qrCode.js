import * as types from "../constants/ActionTypes";

const defaultState = {
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  chatList: null,
  contactsList: null,
  clientInfo: null,
  qrCode: "",
  error: null,
};

const variable = (state = defaultState, action) => {
  switch (action.type) {
    case types.WHATSAPP_START:
      return {
        status: "loading",
        qrCode: "",
        chatList: null,
        error: null,
      };

    case types.WHATSAPP_QR_SUCCESS:
      console.log(action.data);
      return {
        status: "succeeded",
        qrCode: action?.data?.qr || "",
        chatList: action?.data?.chat,
        contactsList: action?.data?.contacts,
        clientInfo: action?.data?.clientInfo,

        error: null,
      };

    case types.LOAD_PROFIL_PIC:
      const chats = state.chatList;
      chats.forEach((u, i) => {
        const chat = action.data.data.filter((us) => us.id.user === u.id.user)[0];

        chats[i].imageUrl = chat?.imageUrl;
        if (!chats[i]?.messages?.length) {
          if (chat.messages[0] && u.isGroup) {
            const name = state.contactsList?.filter((user) => user?.number === chat.messages[0].id?.participant?.user?.replace("@c.us", ""))[0]?.name;
            chat.messages[0].name = chat.messages[0].fromMe ? "You" : name || chat.messages[0].id?.participant?.user?.replace("@c.us", "");
          }

          chats[i].messages = chat?.messages;
        }
      });
      console.log(chats);

      return {
        ...state,
        chatList: chats,
      };

    case types.WHATSAPP_FAILURE:
      return {
        status: "failed",
        chatList: null,
        qrCode: "",
        error: action.resErr,
      };

    case types.UPDATE_MSG_IN_CHAT:
      console.log(action.data);
      // find the index to new msg in old chat list
      const newMsg = state.chatList?.findIndex((ch) => ch.id._serialized === action.data.msg.id._serialized.split("_")[1]);

      // if msg is status or not normal user/grup
      if (newMsg === -1 || !newMsg) {
        return state;
      }

      if (action?.data?.msg && (action.data.msg.fromMe || action.data.msg.isGroup)) {
        const name = state.contactsList?.filter((user) => user?.number === action?.data?.msg?.id?.participant?.replace("@c?.us", ""))[0]?.name;
        console?.log("🚀 ~ file: qrCode?.js ~ line 44 ~ chats?.map ~ name", name);
        action.data.msg.name = action?.data?.msg?.fromMe ? "You" : name || action?.data?.msg?.id?.participant?.replace("@c.us", "");
      }

      // create new cht list whit new msg
      const oldChatList = state.chatList;
      oldChatList[newMsg]?.messages?.push(action.data.msg);
      oldChatList[newMsg].timestamp = action.data.msg.timestamp;

      // sort chat list by last msg
      oldChatList.sort((a, b) => ((a.pinned || b.pinned) && 1) || b.timestamp - a.timestamp);

      return {
        ...state,
        chatList: oldChatList,
      };

    case types.LOAD_MESSAGES_IN_SELECT_CHAT:
      const chatListFilter = state.chatList.findIndex((contact) => contact.id._serialized === action.messages[0].id.remote);

      const chatList = state.chatList;
      chatList[chatListFilter].messages = action.messages;
      chatList[chatListFilter].loadAllMessage = true;

      return {
        ...state,
        chatList: chatList,
      };

    case types.SERVER_DOWNLOAD_MEDIA:
      // console.log(action);
      // find the chat that the user selected
      const chatSelect = state.chatList?.findIndex((ch) => ch.id._serialized === action.chatID);

      // if msg is status or not normal user/grup
      if (chatSelect === -1 || !chatSelect) {
        return state;
      }

      // add the media in the chat
      const newChatList = state.chatList;
      const addMedia = newChatList[chatSelect]?.messages?.findIndex((msg) => msg.id.id === action.msgID);
      // if msg is status or not normal user/grup
      if (addMedia === -1 || !addMedia) {
        return state;
      }

      // if the server get error in downloading
      if (!action.media) {
        newChatList[chatSelect].messages[addMedia].media = [!1];
        return {
          ...state,
          chatList: newChatList,
        };
      }

      newChatList[chatSelect].messages[addMedia].media = action.media;

      return {
        ...state,
        chatList: newChatList,
      };

    default:
      return state;
  }
};

export default variable;
