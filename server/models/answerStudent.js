const mongoose = require("mongoose");
const schema = mongoose.Schema;

const answerStudentSchema = new schema({
  // cours: [{ type: String }],
  user_id: { type: String },
  quizz_id: { type: String },
  question_id: { type: String },
  answer_id: { type: String },
});

const AnswerStudent = mongoose.model("answerStudent", answerStudentSchema);
module.exports = AnswerStudent;
