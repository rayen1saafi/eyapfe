const mongoose = require("mongoose");
const schema = mongoose.Schema;

const meetSchema = new schema({
  course_id: { type: String },
  titre: { type: String },
  etat: { type: Boolean, default: false },
});

const Meet = mongoose.model("meeet", meetSchema);
module.exports = Meet;
