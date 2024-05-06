const mongoose = require("mongoose");
const schema = mongoose.Schema;

const questionSchema = new schema({
  // cours: [{ type: String }],
  quizz_id: { type: String },

  titre: { type: String },
  time: { type: Number },
});

const Question = mongoose.model("question", questionSchema);
module.exports = Question;
