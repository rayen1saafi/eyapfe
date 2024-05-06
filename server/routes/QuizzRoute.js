const express = require("express");
const quizzRouter = express.Router();

const Quizz = require("../models/quizz");

//add quizz
quizzRouter.post("/add", async (req, res) => {
  try {
    let newQuizz = new Quizz(req.body);
    const result = await newQuizz.save();
    res.send({ quizz: result, msg: "quizz added" });
  } catch (error) {
    console.log(error);
  }
});
//get all quizzs
quizzRouter.get("/all", async (req, res) => {
  try {
    let result = await Quizz.find();
    res.send({
      quizz: result,
      msg: "all quizz",
    });
  } catch (error) {
    console.log(error);
  }
});

///get  quizzs by id
quizzRouter.get("/get/:id", async (req, res) => {
  try {
    let result = await Quizz.findById(req.params.id);
    res.send({
      quizz: result,
      msg: "this is the quizz by id",
    });
  } catch (error) {
    console.log(error);
  }
});

//update quizz by id

quizzRouter.put("/update/:id", async (req, res) => {
  try {
    let result = await Quizz.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true }
    );
    res.send({ newQuizz: result, msg: "quizz updated" });
  } catch (error) {
    console.log(error);
  }
});
//delete quizz
quizzRouter.delete("/delete/:id", async (req, res) => {
  try {
    let result = await Quizz.findByIdAndDelete(req.params.id);
    res.send({ msg: "quizz is delete" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = quizzRouter;
