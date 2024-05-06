const mongoose = require("mongoose");
const schema = mongoose.Schema;

const lessonsSchema = new schema({
  course_id: { type: String, required: true },
  titre: { type: String, required: true },
});

const Lessons = mongoose.model("Lesson", lessonsSchema);
module.exports = Lessons;
