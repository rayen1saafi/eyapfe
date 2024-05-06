const express = require("express");
const packRouter = express.Router();

const Pack = require("../models/pack");
const { packRules, Validation } = require("../middleware/pack-validator");

//add pack
packRouter.post("/add", packRules(), Validation, async (req, res) => {
  try {
    let newPack = new Pack(req.body);
    const result = await newPack.save();
    res.send({ pack: result, msg: "pack added" });
  } catch (error) {
    console.log(error);
  }
});
//get all packs
packRouter.get("/all", async (req, res) => {
  try {
    let result = await Pack.find();
    res.send({
      packs: result,
      msg: "all packs",
    });
  } catch (error) {
    console.log(error);
  }
});

///get  packs by id
packRouter.get("/get/:id", async (req, res) => {
  try {
    let result = await Pack.findById(req.params.id);
    res.send({
      packs: result,
      msg: "this is the pack by id",
    });
  } catch (error) {
    console.log(error);
  }
});

//update pack by id

packRouter.put("/update/:id", async (req, res) => {
  try {
    let result = await Pack.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true }
    );
    res.send({ newPack: result, msg: "Pack updated" });
  } catch (error) {
    console.log(error);
  }
});
//delete pack
packRouter.delete("/delete/:id", async (req, res) => {
  try {
    let result = await Pack.findByIdAndDelete(req.params.id);
    res.send({ msg: "pack is delete" });
  } catch (error) {
    console.log(error);
  }
});

// delet all packs
packRouter.delete("/deleteAll", async (req, res) => {
  try {
    let result = await Pack.deleteMany({
      confirmed: req.body.confirmed,
    });
    res.send({ msg: "all packs deleted" });
  } catch (error) {
    console.log(error);
  }
});

packRouter.put("/inscri/:id", async (req, res) => {
  try {
    let result = await Pack.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { inscri: req.body } },
      { new: true }
    );
    res.send({ msg: "cours is updated " });
  } catch (error) {
    console.log(error);
  }
});


packRouter.put("/student/:id", async (req, res) => {
  try {
    let result = await Pack.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { student: req.body } },
      { new: true }
    );
    res.send({ msg: "cours is updated " });
  } catch (error) {
    console.log(error);
  }
});
module.exports = packRouter;
