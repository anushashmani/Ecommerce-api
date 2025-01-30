const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      lowercase: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
    },
    profileImage: {
      type: String,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
