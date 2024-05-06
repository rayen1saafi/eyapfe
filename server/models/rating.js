const mongoose = require("mongoose");
const schema = mongoose.Schema;

const ratingSchema = new schema({
  // cours: [{ type: String }],
  instructor_id: { type: String },
  rater_id : { type: String },
  rate : {type : Number}
});

const Rating = mongoose.model("Rating", ratingSchema);
module.exports = Rating;
