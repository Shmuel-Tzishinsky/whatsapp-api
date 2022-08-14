const { Server } = require("socket.io");
const { Client, LocalAuth } = require("whatsapp-web.js");
const jwt = require("jsonwebtoken");
const {
  sendInitialtData,
  emitQrCode,
  authenticated,
  newMessage,
  userSelectChat,
  sendMessage,
  downloadMediaInMsg,
} = require("../services/whatsapp.services");

// Option server
const option = {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  },
};

class Whatsapp {
  constructor() {
    this.client = null;
    this.socket = null;
    this.userID;
  }

  // Load listeners in socket
  loadListenersSocket(socket) {
    this.socket = socket;

    this.socket.on(`user-select-chat-${this.userID}`, async ({ chatID }) => {
      // Load the chat in chat id
      userSelectChat(this.socket, this.client, this.userID, chatID);
    });

    this.socket.on(`send-message-${this.userID}`, async ({ msg }) => {
      // Send the message in this chat
      sendMessage(this.client, msg);
    });

    this.socket.on(`download-media-${this.userID}`, async ({ chatID, msgID }) => {
      // Send the message in this chat
      downloadMediaInMsg(this.socket, this.client, this.userID, chatID, msgID);
    });
  }

  // Load listeners in client
  loadListenersClient(id) {
    this.client = new Client({
      authStrategy: new LocalAuth({
        clientId: id,
      }),
      puppeteer: {
        args: ["--no-sandbox"],
      },
      takeoverOnConflict: true,
      qrMaxRetries: 100,
    });
    this.client.initialize();

    this.client.on("authenticated", () => {
      // uset is authenticated successful
      authenticated();
    });

    this.client.on("ready", async () => {
      // send the initial data on whatsapp
      sendInitialtData(this.socket, this.client, this.userID);
    });

    this.client.on("message", async (msg) => {
      // Send the new msg to client
      newMessage(this.socket, this.userID, msg);
    });

    this.client.on("message_create", async (msg) => {
      const { fromMe } = msg;
      // Send the new msg to client
      fromMe && newMessage(this.socket, this.userID, msg);
      fromMe && console.log(msg.body);
    });

    this.client.on("disconnected", async (e, i) => {
      console.log("client is disconnected: ", e, i);
      // Logs out the client, closing the current session
      this.disconnectClient();
    });

    this.client.on("auth_failure", () => {
      console.log("Error de autentificacion vuelve a generar el QR CODE");
    });
  }

  // disconnect client
  disconnectClient() {
    this.client
      .destroy()
      .then(() => {
        console.log("whatsapp is disconnected: ");
        this.socket.emit(`client-disconnected-${this.userID}`, {
          disconnected: true,
        });
        this.socket = null;
      })
      .catch(console.log);
  }

  // Listener to brawser connection
  initiiallServer(server) {
    const io = new Server(server, option);

    io.on("connection", (socket) => {
      console.log(socket.handshake.auth.token);

      if (!this.socket) {
        console.log("load new socket");
        this.userID = socket.handshake.auth.data;

        // Load listeners in client
        this.loadListenersClient(socket.handshake.auth.data);
      } else {
        // send the initial data on whatsapp
        sendInitialtData(socket, this.client, this.userID);
      }

      // Listener to qe every time (if user is not authenticated or already authenticated)
      this.client.on("qr", (qr) => {
        // emit the qr code
        emitQrCode(socket, this.userID, qr);
      });

      // Load listeners in socket
      this.loadListenersSocket(socket);
    });
  }
}

const whatsapp = new Whatsapp();

module.exports = {
  initialSocket: (server) => whatsapp.initiiallServer(server),
};
