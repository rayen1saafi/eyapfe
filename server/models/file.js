const mongoose = require("mongoose");
const schema = mongoose.Schema;

const fileSchema = new schema({
  lesson_id: { type: String },
  titre: { type: String },
  file: { type: String },
  file_type: { type: String },
  done: { type: [String], default: [] },
});

const File = mongoose.model("file", fileSchema);
module.exports = File;
