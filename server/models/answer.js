const mongoose = require("mongoose");
const schema = mongoose.Schema;

const answerSchema = new schema({
  quizz_id: { type: String },

  question_id: { type: String },
  titre: { type: String },
  isValidate: { type: Boolean },
});

const Answer = mongoose.model("answer", answerSchema);
module.exports = Answer;
