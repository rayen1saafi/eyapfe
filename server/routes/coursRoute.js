const express = require('express') 
const coursRouter = express.Router()

const Cours=require('../models/cours')


//add cours
coursRouter.post("/add", async (req, res) => {
  try {
    let newCours = new Cours(req.body);
    const result = await newCours.save();
    res.send({ cours: result, msg: "cours added" });
  } catch (error) {
    console.log(error);
  }
});
//get all courss
coursRouter.get("/all", async (req, res) => {
  try {
    let result = await Cours.find();
    res.send({
      courss: result,
      msg: "all courss",
    });
  } catch (error) {
    console.log(error);
  }
});


///get  courss by id
coursRouter.get("/get/:id", async (req, res) => {
  try {
    let result = await Cours.findById(req.params.id);
    res.send({
      courss: result,
      msg: "this is the cours by id",
    });
  } catch (error) {
    console.log(error);
  }
});



//update cours by id

coursRouter.put("/update/:id", async (req, res) => {
  try {
    let result = await Cours.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true }
    );
    res.send({ newCours: result, msg: "Cours updated" });
  } catch (error) {
    console.log(error);
  }
});
//delete cours
coursRouter.delete("/delete/:id", async (req, res) => {
  try {
    let result = await Cours.findByIdAndDelete(req.params.id);
    res.send({ msg: "cours is delete" });
  } catch (error) {
    console.log(error);
  }
});

// delet all courss
coursRouter.delete("/deleteAll", async (req, res) => {
    try {
      let result = await Cours.deleteMany({
        confirmed: req.body.confirmed,
      });
      res.send({ msg: "all courss deleted" });
    } catch (error) {
      console.log(error);
    }
  });
// inscription


module.exports=coursRouter