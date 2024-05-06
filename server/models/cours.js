const mongoose = require("mongoose");
const schema = mongoose.Schema;

const coursSchema = new schema({
pack_id: { type: String },
cours_image: { type: String, required: true },
instructor_id: { type: String},
quiz_id: { type: String},
apprenants_liste: [{ type: String }],
titre: { type: String, required: true },
description: { type: String},

});

const Cours = mongoose.model("Cours", coursSchema);
module.exports = Cours;
