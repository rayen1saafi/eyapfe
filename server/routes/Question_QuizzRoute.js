const express = require("express");
const questionRouter = express.Router();

const Question = require("../models/quizzQuestion");

//add question
questionRouter.post("/add", async (req, res) => {
  try {
    let newQuestion = new Question(req.body);
    const result = await newQuestion.save();
    res.send({ question: result, msg: "question added" });
  } catch (error) {
    console.log(error);
  }
});
//get all questions
questionRouter.get("/all", async (req, res) => {
  try {
    let result = await Question.find();
    res.send({
      question: result,
      msg: "all question",
    });
  } catch (error) {
    console.log(error);
  }
});

///get  questions by id
questionRouter.get("/get/:id", async (req, res) => {
  try {
    let result = await Question.findById(req.params.id);
    res.send({
      question: result,
      msg: "this is the question by id",
    });
  } catch (error) {
    console.log(error);
  }
});

//update question by id

questionRouter.put("/update/:id", async (req, res) => {
  try {
    let result = await Question.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true }
    );
    res.send({ newQuestion: result, msg: "question updated" });
  } catch (error) {
    console.log(error);
  }
});
//delete question
questionRouter.delete("/delete/:id", async (req, res) => {
  try {
    let result = await Question.findByIdAndDelete(req.params.id);
    res.send({ msg: "question is delete" });
  } catch (error) {
    console.log(error);
  }
});
questionRouter.delete("/delete_quizzid/:quizz_id", async (req, res) => {
  try {
    let result = await Question.deleteMany({ quizz_id: req.params.quizz_id });
    if (result.deletedCount > 0) {
      res.send({ msg: "Questions are deleted" });
    } else {
      res.send({ msg: "No questions found for the provided quizz_id" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});


module.exports = questionRouter;
