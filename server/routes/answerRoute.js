const express = require("express");
const answerRouter = express.Router();

const Answer = require("../models/answer");

//add answer
answerRouter.post("/add", async (req, res) => {
  try {
    let newAnswer = new Answer(req.body);
    const result = await newAnswer.save();
    res.send({ answer: result, msg: "answer added" });
  } catch (error) {
    console.log(error);
  }
});
//get all answers
answerRouter.get("/all", async (req, res) => {
  try {
    let result = await Answer.find();
    res.send({
      answer: result,
      msg: "all answer",
    });
  } catch (error) {
    console.log(error);
  }
});

///get  answers by id
answerRouter.get("/get/:id", async (req, res) => {
  try {
    let result = await Answer.findById(req.params.id);
    res.send({
      answer: result,
      msg: "this is the answer by id",
    });
  } catch (error) {
    console.log(error);
  }
});

//update answer by id

answerRouter.put("/update/:id", async (req, res) => {
  try {
    let result = await Answer.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true }
    );
    res.send({ newAnswer: result, msg: "answer updated" });
  } catch (error) {
    console.log(error);
  }
});
//delete answer
answerRouter.delete("/delete/:id", async (req, res) => {
  try {
    let result = await Answer.findByIdAndDelete(req.params.id);
    res.send({ msg: "answer is delete" });
  } catch (error) {
    console.log(error);
  }
});
answerRouter.delete("/delete_quizzid/:quizz_id", async (req, res) => {
  try {
    let result = await Answer.deleteMany({ quizz_id: req.params.quizz_id });
    if (result.deletedCount > 0) {
      res.send({ msg: "Answer are deleted" });
    } else {
      res.send({ msg: "No Answer found for the provided quizz_id" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

module.exports = answerRouter;
