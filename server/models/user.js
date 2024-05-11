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
      "https://e7.pngegg.com/pngimages/321/296/png-clipart-computer-icons-user-svg-free-customers-miscellaneous-text-thumbnail.png",
  },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  isActivated: { type: Boolean, default: false },
  activationToken: { type: String },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
