/* eslint-disable no-useless-return */
/* eslint-disable no-underscore-dangle */
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const {
  registerValidation,
  loginValidation,
  tokenValidation,
  ensureEmailValidation,
  passwordResetValidation,
  passwordChangeValidation,
  userEditValidation,
  registerCompanyValidation,
} = require("../utils/user.validation");
const passwordEncrypt = require("../utils/passwordEncrypt");
const { getUser } = require("../services/user.services");

const validation = {
  register: registerValidation,
  login: loginValidation,
  verifyUser: tokenValidation,
  ensureEmail: ensureEmailValidation,
  passwordReset: passwordResetValidation,
  passwordChange: passwordChangeValidation,
  editUser: userEditValidation,
  addNewCompany: registerCompanyValidation,
};

const handleValidation = (body, res, type) => {
  const { error } = validation[type](body);
  if (error) {
    throw Error(error.details[0].message);
  }
};

const registerUser = async (req, res) => {
  // Validate data before creating a user

  //   Hash password
  try {
    await handleValidation(req.body, res, "register");
    //   Checking if the user is already in the db
    const emailExist = await User.findOne({ email: req.body.email });

    if (emailExist) {
      return res.status(400).json({ error_msg: "E-Mail already exists" });
    }
    req.body.password = await passwordEncrypt(req.body.password);
    // Generate and send token
    const token = await crypto.randomBytes(20).toString("hex");
    // const userToken = new Token({ _userId: savedUser._id, token: token })
    // await userToken.save()
    if (!token) {
      res.status(500).json({ error_msg: "An error occured" });
    }

    // Create a new user
    const user = new User({ ...req.body, token });

    const savedUser = await user.save();
    // Send email using sendgrid here
    return res.status(201).json({ data: savedUser });
  } catch (err) {
    return res.status(400).json({ error_msg: err.message });
  }
};

const loginUser = async (req, res) => {
  // Validate data before creating a user
  try {
    handleValidation(req.body, res, "login");

    //   Checking if the user is already in the db
    const user = await getUser({ email: req.body.email });

    //   Password check
    const validPass = await bcrypt.compare(req.body.password, user.password);

    if (!validPass) {
      return res.status(400).json({ error_msg: "הסיסמה שגויה" });
    }

    // Create and assign a token
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "2D",
      }
    );

    return res.status(200).json({
      name: user.name,
      id: user._id,
      access_token: token,
    });
  } catch (err) {
    return res.status(400).json({ error_msg: err.message });
  }
};

// const editUserAction = (req, res) => {
//   handleValidation(req.body, res, 'editUser');
// };

const verifyUserRegistration = async (req, res) => {
  // Validate the incoming data
  try {
    handleValidation(req.body, res, "verifyUser");
    const token = await getUser({ token: req.body.token });
    const user = await getUser({ email: req.body.email });

    if (user.isActive) {
      return res.status(400).json({ error_msg: "User already verified" });
    }

    // This should not even happen. I am checking if the user email matches the user id in the token
    if (!(token._userId !== user._id)) {
      return res.status(400).json({ error_msg: "Token does not match user" });
    }

    user.isActive = true;
    await user.save();
    await token.remove();
    return res.status(200).json({ data: "success" });
  } catch (err) {
    return res.status(400).json({ error_msg: err.message });
  }
};

const resendVerificationToken = async (req, res) => {
  try {
    handleValidation(req.body, res, "ensureEmail");

    const { email } = req.body;
    const user = await getUser({ email });
    if (user.isActive) {
      return res
        .status(400)
        .json({ error_msg: "This user is already verified" });
    }

    // send email using the token to user
    return res.status(200).json({ data: "success" });
  } catch (err) {
    return res.status(400).json({ error_msg: err.message });
  }
};

const passwordReset = async (req, res) => {
  try {
    handleValidation(req.body, res, "passwordReset");
    const { email, token: reqToken, password: newPassword } = req.body;
    const token = await getToken({ token: reqToken });
    // User confimation
    const user = await getUser({ email });

    // Ensure new password not equals to old password
    const passwordCompare = await bcrypt.compare(newPassword, user.password);

    if (passwordCompare) {
      return res
        .status(400)
        .json({ error_msg: "You can't use this password again" });
    }
    user.password = await passwordEncrypt(req.body.password);
    await user.save();
    // Delete token if user is verified
    await token.remove();
    // Send an email to the user telling the password change successful
    return res.status(200).json({ data: "Success" });
  } catch (err) {
    return res.status(400).json({ error_msg: err.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const { newPassword, oldPassword, admin } = req.body;
    const user = await getUser({ _id: req.user._id });
    if (user.role === "admin") {
      return res.status(401).json({ error_msg: "Nice try" });
    }
    if (admin) {
      user.password = await passwordEncrypt(newPassword);
    } else {
      handleValidation(req.body, res, "passwordChange");

      if (newPassword === oldPassword) {
        return res.status(400).json({
          error_msg: "New and Current password is the same, use a new password",
        });
      }

      // Ensure old password is equal to db pass
      const validPass = await bcrypt.compare(oldPassword, user.password);

      if (!validPass) {
        return res.status(400).json({ error_msg: "Current password is wrong" });
      }
      user.password = await passwordEncrypt(newPassword);
    }
    // Ensure new password not equals to old password
    await user.save();
    return res.json("Success");
  } catch (err) {
    return res.status(400).json({ error_msg: err.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  verifyUserRegistration,
  resendVerificationToken,
  passwordReset,
  changePassword,
};
