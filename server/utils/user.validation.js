const Joi = require("@hapi/joi");

// Register validation
const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    lestName: Joi.string().min(3).required(),
    phone: Joi.string(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    role: Joi.string(),
    isActive: Joi.boolean(),
  });

  return schema.validate(data);
};

// User edit validation
const userEditValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    phone: Joi.number(),
    email: Joi.string().min(6).required().email(),
    role: Joi.string().required(),
    password: Joi.string().min(6),
    isActive: Joi.boolean().required(),
    _id: Joi.string().required(),
  });

  return schema.validate(data);
};

// Login validation
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

// Token verifit validation
const tokenValidation = (data) => {
  const schema = Joi.object({
    token: Joi.string().required(),
    email: Joi.string().min(6).required().email(),
  });

  return schema.validate(data);
};

// Token resend validation
const ensureEmailValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
  });

  return schema.validate(data);
};

// Password reset validation
const passwordResetValidation = (data) => {
  const schema = Joi.object({
    token: Joi.string().required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

// Password change validator
const passwordChangeValidation = (data) => {
  const schema = Joi.object({
    oldPassword: Joi.string().min(6).required(),
    newPassword: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

module.exports = {
  loginValidation,
  registerValidation,
  tokenValidation,
  ensureEmailValidation,
  passwordResetValidation,
  passwordChangeValidation,
  userEditValidation,
};
