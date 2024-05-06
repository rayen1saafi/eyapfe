const express = require("express");
const lessonsRouter = express.Router();

const Lessons = require("../models/lessons");

//add lesson
lessonsRouter.post("/add", async (req, res) => {
  try {
    let newLessons = new Lessons(req.body);
    const result = await newLessons.save();
    res.send({ lesson: result, msg: "Lesson added" });
  } catch (error) {
    console.log(error);
  }
});
//get all lessons
lessonsRouter.get("/all", async (req, res) => {
  try {
    let result = await Lessons.find();
    res.send({
      lesson: result,
      msg: "all lessons",
    });
  } catch (error) {
    console.log(error);
  }
});

///get  lessons by id
lessonsRouter.get("/get/:id", async (req, res) => {
  try {
    let result = await Lessons.findById(req.params.id);
    res.send({
      lesson: result,
      msg: "this is the lesson by id",
    });
  } catch (error) {
    console.log(error);
  }
});

//update lesson by id

lessonsRouter.put("/update/:id", async (req, res) => {
  try {
    let result = await Lessons.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true }
    );
    res.send({ newLessons: result, msg: "Lesson updated" });
  } catch (error) {
    console.log(error);
  }
});
//delete lesson
lessonsRouter.delete("/delete/:id", async (req, res) => {
  try {
    let result = await Lessons.findByIdAndDelete(req.params.id);
    res.send({ msg: "lesson is delete" });
  } catch (error) {
    console.log(error);
  }
});
// delet all lessons
lessonsRouter.delete("/deleteAll", async (req, res) => {
  try {
    let result = await Lessons.deleteMany({
      confirmed: req.body.confirmed,
    });
    res.send({ msg: "all lessons deleted" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = lessonsRouter;
