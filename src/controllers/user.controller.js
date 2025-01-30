const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const {
  findByEmailAndPhone,
  createUser,
  saveToken,
  getTokenByUID,
  deleteTokensByUID,
  findByEmail,
} = require("../services/user.service.js");
const { createHash, compareHash } = require("../utils/hash.util.js");
const { config } = require("../configs/server.config.js");

const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map((err) => ({
          field: err.path,
          message: err.msg,
        })),
      });
    }

    const { email, password } = req.body;

    const user = await findByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "invalid credentials",
      });
    }

    const passwordMatch = await compareHash(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "password does not match",
      });
    }

    const existingTokens = await getTokenByUID(user._id);
    if (existingTokens.length > 0) {
      return res.status(403).json({
        success: false,
        message: "already logged in",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        username: user.username,
      },
      config.secretKey,
      { expiresIn: "1h" }
    );

    await saveToken({
      token,
      user: user._id,
    });

    return res.status(200).json({
      success: true,
      message: "Successfully logged in",
      data: {
        userId: user._id,
        token,
      },
    });
  } catch (error) {
    console.error("error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const signup = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map((err) => ({
          field: err.path,
          message: err.msg,
        })),
      });
    }
    const { username, email, password, confirmPassword, phone, profileImage } =
      req.body;

    const user = await findByEmailAndPhone(email, phone);
    if (user) {
      const conflictField = user.email === email ? "Email" : "Phone";
      return res.status(400).send(`${conflictField} already exists`);
    }

    if (password !== confirmPassword) {
      return res.status(400).send("Password and confirm password do not match");
    }

    const hashedPassword = await createHash(password);

    const payload = {
      username,
      email,
      password: hashedPassword,
      phone,
      confirmPassword,
      profileImage: req.file
        ? req.file.path
        : req.body.profileImage || "default-image-url.jpg",
    };

    const newUser = await createUser(payload);
    if (!newUser) {
      return res.send("Something went wrong");
    }

    return res.status(201).json({
      success: true,
      message: "User Created Successfully",
    });
  } catch (error) {
    console.log(error);
    res.send("Something went wrong");
  }
};

const logout = async (req, res) => {
  try {
    const { uid } = req.body;
    const logoutUser = await deleteTokensByUID(uid);
    if (logoutUser.deletedCount === 0) {
      return res
        .status(500)
        .json({ success: false, message: "already logged in", data: null });
    }

    return res
      .status(200)
      .json({ success: true, message: "succesfully logged out", data: null });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "something went wrong", data: null });
  }
};

module.exports = {
  login,
  signup,
  logout,
};
