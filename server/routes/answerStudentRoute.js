const express = require("express");
const answerStudentRouter = express.Router();

const AnswerStudent = require("../models/answerStudent");

//add answerStudent
answerStudentRouter.post("/add", async (req, res) => {
  try {
    let newAnswerStudent = new AnswerStudent(req.body);
    const result = await newAnswerStudent.save();
    res.send({ answerStudent: result, msg: "answer added" });
  } catch (error) {
    console.log(error);
  }
});
//get all answerStudentStudents
answerStudentRouter.get("/all", async (req, res) => {
  try {
    let result = await AnswerStudent.find();
    res.send({
      answerStudent: result,
      msg: "all answerStudent",
    });
  } catch (error) {
    console.log(error);
  }
});

///get  answerStudents by id
answerStudentRouter.get("/get/:id", async (req, res) => {
  try {
    let result = await AnswerStudent.findById(req.params.id);
    res.send({
      answerStudent: result,
      msg: "this is the answerStudent by id",
    });
  } catch (error) {
    console.log(error);
  }
});

//update answerStudent by id

answerStudentRouter.put("/update/:id", async (req, res) => {
  try {
    let result = await AnswerStudent.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true }
    );
    res.send({ newAnswerStudent: result, msg: "answerStudent updated" });
  } catch (error) {
    console.log(error);
  }
});
//delete answerStudent
answerStudentRouter.delete("/delete/:id", async (req, res) => {
  try {
    let result = await AnswerStudent.findByIdAndDelete(req.params.id);
    res.send({ msg: "answerStudent is delete" });
  } catch (error) {
    console.log(error);
  }
});
answerStudentRouter.delete("/delete_quizzid/:quizz_id", async (req, res) => {
  try {
    let result = await AnswerStudent.deleteMany({ quizz_id: req.params.quizz_id });
    if (result.deletedCount > 0) {
      res.send({ msg: "AnswerStudent are deleted" });
    } else {
      res.send({ msg: "No AnswerStudent found for the provided quizz_id" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});
module.exports = answerStudentRouter;
