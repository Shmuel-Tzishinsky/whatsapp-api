const express = require("express");

const app = express();

// Import Routes
require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");
const http = require("http");
const bodyParser = require("body-parser");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const { initialSocket } = require("./controllers/whatsapppController");

const connectDB = require("./config/db");
app.use(cors());
const server = http.createServer(app);

// Norgan
app.use(morgan("dev"));

// Connect to DB
connectDB();

const port = process.env.PORT || 3050;

// Middleware
app.use(express.json({ limit: "50mb" }));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
//Make sure u have added this line
// parse application/json
app.use(bodyParser.json());

//Submits Specific (url) files in method GET
app.use("/server/static", express.static(__dirname + "/server/static"));

// Route middlewares
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
// app.use("/api/whatsapp", whatsappRoute);

initialSocket(server);
server.listen(port, () => console.log("Server up and running"));
