const express = require("express");
const { login, signup, logout } = require("../controllers/user.controller");
const { signupValidationRules } = require("../validators/request.validator");
const { upload } = require("../multer/multermiddleware");

const route = express.Router();

route.post("/login", login);
route.post(
  "/signup",
  upload.single("profileImage"),
  signupValidationRules,
  signup
);
route.post("/logout", logout);

module.exports = { route };
