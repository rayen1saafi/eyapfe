const mongoose = require("mongoose");
const schema = mongoose.Schema;

const quizzSchema = new schema({
  course_id: { type: String },
  titre: { type: String },
  etat: { type: Boolean, default: false },
});

const Quizz = mongoose.model("quizz", quizzSchema);
module.exports = Quizz;
