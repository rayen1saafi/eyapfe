const mongoose = require("mongoose");
const schema = mongoose.Schema;

const packSchema = new schema({
  // cours: [{ type: String }],
  pack_image: { type: String },
  dateDebut: { type: String },
  dateFin: { type: String },
  nom: { type: String, required: true },
  inscri: { type: [String], default: [] },
  student: { type: [String], default: [] },
});

const Pack = mongoose.model("Pack", packSchema);
module.exports = Pack;
