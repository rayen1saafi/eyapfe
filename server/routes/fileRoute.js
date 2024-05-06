const express = require("express");
const File = require("../models/file");

const app = express(); // Create Express app instance
const fileRouter = express.Router();

// Multer storage configuration

// Add middleware to parse JSON bodies
app.use(express.json());

// Route for adding a file
fileRouter.post("/add", async (req, res) => {
  try {
    let newFile = new File(req.body);
    const result = await newFile.save();
    res.send({ file: result, msg: "Lesson added" });
  } catch (error) {
    console.log(error);
  }
});
// Route for getting all files
fileRouter.get("/all", async (req, res) => {
  try {
    let result = await File.find();
    res.send({
      files: result, // Corrected property name to 'files'
      msg: "all files",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
});

/// Route for getting a file by ID
fileRouter.get("/get/:id", async (req, res) => {
  try {
    let result = await File.findById(req.params.id);
    res.send({
      file: result,
      msg: "this is the file by id",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
});

// Route for updating a file by ID
fileRouter.put("/update/:id", async (req, res) => {
  try {
    let result = await File.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true }
    );
    res.send({ newFile: result, msg: "file updated" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
});

// Route for deleting a file by ID
fileRouter.delete("/delete/:id", async (req, res) => {
  try {
    let result = await File.findByIdAndDelete(req.params.id);
    res.send({ msg: "file is deleted" }); // Corrected response message
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
});

fileRouter.put("/done/:id", async (req, res) => {
  try {
    let result = await File.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { done: req.body } },
      { new: true }
    );
    res.send({ msg: "cours is updated " });
  } catch (error) {
    console.log(error);
  }
});

module.exports = fileRouter;
