const express = require("express");
const meetRouter = express.Router();

const Meet = require("../models/Meet");

//add meet
meetRouter.post("/add", async (req, res) => {
  try {
    let newMeet = new Meet(req.body);
    const result = await newMeet.save();
    res.send({ meet: result, msg: "meet added" });
  } catch (error) {
    console.log(error);
  }
});
//get all meets
meetRouter.get("/all", async (req, res) => {
  try {
    let result = await Meet.find();
    res.send({
      meet: result,
      msg: "all meet",
    });
  } catch (error) {
    console.log(error);
  }
});

///get  meets by id
meetRouter.get("/get/:id", async (req, res) => {
  try {
    let result = await Meet.findById(req.params.id);
    res.send({
      meet: result,
      msg: "this is the meet by id",
    });
  } catch (error) {
    console.log(error);
  }
});

//update meet by id

meetRouter.put("/update/:id", async (req, res) => {
  try {
    let result = await Meet.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true }
    );
    res.send({ newMeet: result, msg: "meet updated" });
  } catch (error) {
    console.log(error);
  }
});
//delete meet
meetRouter.delete("/delete/:id", async (req, res) => {
  try {
    let result = await Meet.findByIdAndDelete(req.params.id);
    res.send({ msg: "meet is delete" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = meetRouter;
