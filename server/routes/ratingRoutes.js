const express = require("express");
const ratingRouter = express.Router();

const Rating = require("../models/rating");

// Add rating
ratingRouter.post("/add", async (req, res) => {
    try {
      const newRating = new Rating(req.body); // Assuming req.body contains instructor_id, rater_id, and rate
      const result = await newRating.save();
      res.status(201).send({ rating: result, msg: "Rating added" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: "Failed to add rating" });
    }
  });
  
//get all ratings
ratingRouter.get("/all", async (req, res) => {
  try {
    let result = await Rating.find();
    res.send({
      ratings: result,
      msg: "all ratings",
    });
  } catch (error) {
    console.log(error);
  }
});

///get  ratings by id
ratingRouter.get("/get/:id", async (req, res) => {
  try {
    let result = await Rating.findById(req.params.id);
    res.send({
      ratings: result,
      msg: "this is the rating by id",
    });
  } catch (error) {
    console.log(error);
  }
});

//update rating by id
ratingRouter.put("/update/:id", async (req, res) => {
    try {
      let result = await Rating.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: { ...req.body } },
        { new: true } // Ensure the updated document is returned
      );
      res.send({ newRating: result, msg: "Rating updated" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: "Failed to update rating" }); // Handle errors appropriately
    }
  });
  
//delete rating
ratingRouter.delete("/delete/:id", async (req, res) => {
  try {
    let result = await Rating.findByIdAndDelete(req.params.id);
    res.send({ msg: "rating is delete" });
  } catch (error) {
    console.log(error);
  }
});

// delet all ratings
ratingRouter.delete("/deleteAll", async (req, res) => {
  try {
    let result = await Rating.deleteMany({
      confirmed: req.body.confirmed,
    });
    res.send({ msg: "all ratings deleted" });
  } catch (error) {
    console.log(error);
  }
});


module.exports = ratingRouter;
