// Load all messages end media photos asynchronously, after all to
// shorten upload time (saves almost half the time)
const loadMediaEndLastMessage = async (socket, client, userID, chats) => {
  const getProfilePicUrl = await chats.map(async (chat) => {
    const messagesWithOutMedia = await chat.fetchMessages({ limit: 1 });
    const messages = await downloadMedia(messagesWithOutMedia);
    const imageUrl = await client.getProfilePicUrl(chat.id._serialized);
    return { id: chat.id, messages, imageUrl };
  });

  const chatWithPics = await Promise.all(getProfilePicUrl);

  socket.emit(`profile-pic-url-${userID}`, {
    data: chatWithPics,
  });
  console.log("i send the profile too user", userID);
};
let num = 0;
// send the initial data on whatsapp
const sendInitialtData = async (socket, client, userID) => {
  console.log("send the initial data on whatsapp!");
  try {
    const contacts = await client.getContacts();
    const chats = await client.getChats();
    const imgClient = await client.getProfilePicUrl(client.info.me._serialized);

    socket.emit(`ready-${userID}`, {
      contacts: contacts,
      chat: chats,
      clientInfo: { ...client.info, imgClient },
    });
    console.log(num);
    num++;
    console.log("i send the chtas too user", userID);

    // load last msg end media here (after all), because is take long time
    loadMediaEndLastMessage(socket, client, userID, chats);
  } catch (error) {
    console.log("🚀error", error);
  }
};

// emit the qr code
const emitQrCode = (socket, userID, qr) => {
  console.log("LOAD QR");
  socket.emit(`get-qr-${userID}`, { qr: qr });
};

// uset is authenticated successful
const authenticated = (socket, qr) => {
  console.log("User authentication successful, I load the initial data from whatsapp");
};

// Send the new msg to client
const newMessage = async (socket, userID, msg) => {
  const messagesWithMedia = await downloadMedia(msg);
  socket.emit(`msg-${userID}`, { msg: messagesWithMedia });
};

// User select chat >> send the message in this chat
// (loading only 50 message)
const userSelectChat = async (socket, client, userID, chatID) => {
  const chatById = await client.getChatById(chatID);
  const countryCode = await client.getCountryCode(chatID);
  const messages = await chatById.fetchMessages({ limit: 50 });
  const messagesWithMedia = await downloadMedia(messages);

  socket.emit(`user-select-chat-${userID}`, {
    messages: messagesWithMedia,
    countryCode: countryCode,
  });
};

// User select chat >> send the message in this chat
// (loading only 50 message)
const sendMessage = async (client, msg) => {
  const { from, body } = msg;
  console.log("🚀 ~ file: Whatsapp.services.js ~ line 75 ~ sendMessage ~ from , body", from, body);
  try {
    client.sendMessage(from, body);
  } catch (error) {
    console.log("🚀 ~ file: Whatsapp.services.js ~ line 79 ~ sendMessage ~ error", error);
  }
};

const downloadMediaInMsg = async (socket, client, userID, chatID, msgID) => {
  try {
    const chatById = await client.getChatById(chatID);
    const messagesWithOutMedia = await chatById.fetchMessages({ limit: 50 });
    const findMsg = await messagesWithOutMedia.find((m) => m.id.id === msgID);
    if (!findMsg) {
      throw "Cent find message";
    }
    const media = await findMsg.downloadMedia();
    if (!media) {
      throw "Failed to download media";
    }

    socket.emit(`server-download-media-${userID}`, {
      media: media,
      msgID: msgID,
      chatID: chatID,
    });
  } catch (error) {
    console.log(error);
    socket.emit(`server-download-media-${userID}`, {
      media: { error: !0 },
      msgID: msgID,
      chatID: chatID,
    });
  }
};

// download media from chat
const downloadMedia = async (messages) => {
  for (let i = 0; i < messages.length; i++) {
    if (
      messages[i].type === "sticker" ||
      (messages[i].type === "video" && !messages[i]._data?.body) ||
      (messages[i].type === "image" && !messages[i]._data?.body) ||
      messages[i].type === "audio" ||
      messages[i].type === "ptt"
    ) {
      messages[i].media = (await messages[i].downloadMedia()) || !1;
    }
  }

  return messages;
};

module.exports = {
  sendInitialtData,
  emitQrCode,
  authenticated,
  newMessage,
  userSelectChat,
  sendMessage,
  downloadMediaInMsg,
};
