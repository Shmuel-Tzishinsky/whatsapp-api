const router = require("express").Router();

const {
  verifiedFunction: ensureAuth,
  checkAdmin,
} = require("./verifyJwtToken");

const { initialSocket } = require("../controllers/whatsapppController");

// router.post("/", initialSocket);

module.exports = router;
