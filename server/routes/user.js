const router = require("express").Router();

const {
  verifiedFunction: ensureAuth,
  checkAdmin,
} = require("./verifyJwtToken");

const {
  getLoggedInUser,
  getAllUsers,
  getAllActiveUsers,
  getSingleUser,
  editUserAction,
  deleteUserAction,
} = require("../controllers/userController");

router.get("/", ensureAuth, getAllUsers);
router.get("/me", ensureAuth, getLoggedInUser);

router.get("/active", ensureAuth, getAllActiveUsers);
router.get("/single/:id", getSingleUser);
router.post("/delete/:id", [ensureAuth, checkAdmin], deleteUserAction);

router.patch("/edit-user", [ensureAuth, checkAdmin], editUserAction);

module.exports = router;
