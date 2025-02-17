const db = require("../models/index.js");
const { user: User, token: Token } = db;

const findByEmailAndPhone = async (email, phone) => {
  try {
    const user = await User.findOne({ $or: [{ email }, { phone }] });
    return user;
  } catch (error) {
    throw error;
  }
};
const findByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    throw error;
  }
};

const createUser = async (payload) => {
  try {
    const newUser = new User({ ...payload });
    const user = await newUser.save();
    return user;
  } catch (error) {
    throw error;
  }
};

const saveToken = async (payload) => {
  try {
    const newToken = new Token({ ...payload });
    const token = await newToken.save();
    return token;
  } catch (error) {
    throw error;
  }
};

const getTokenByUID = async (uid) => {
  try {
    const response = await Token.find({ user: uid });
    return response;
  } catch (error) {
    throw error;
  }
};

const deleteTokensByUID = async (uid) => {
  try {
    const response = await Token.deleteOne({ user: uid });
    return response;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  findByEmailAndPhone,
  createUser,
  saveToken,
  getTokenByUID,
  deleteTokensByUID,
  findByEmail,
};
