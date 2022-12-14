/* eslint-disable no-underscore-dangle */
const router = require("express").Router();
const { verifiedFunction: ensureAuth } = require("./verifyJwtToken");

const {
  registerUser,
  loginUser,
  verifyUserRegistration,
  resendVerificationToken,
  passwordReset,
  changePassword,
} = require("../controllers/authControllers");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/verify", verifyUserRegistration);

router.post("/resend-verification-token", resendVerificationToken);

// Password reset
router.post("/password-reset", passwordReset);

// User change password
router.post("/change-password", ensureAuth, changePassword);

module.exports = router;
