const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: Number },
  description: { type: String },
  role: {
    type: String,
    default: "user",
  },
  user_img: {
    type: String,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW6hmwoTYquPrdYd_DfDFnXxsM8RBTm4GvNLla16kpEg&s",
  },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  isActivated: { type: Boolean, default: false },
  activationToken: { type: String },

});

const User = mongoose.model("User", userSchema);
module.exports = User;
