import express from "express";
import Other from "../models/Other";


const router = express.Router();

//NEWHOUSE
router.post("/newActivity", async (req, res) => {
  const newaction = new Other({
    desc: req.body.desc,
    address: req.body.address,
    sector: req.body.sector,
  });

  try {
    const saveAction = await newaction.save();
    res.status(201).json(saveAction);
  } catch (err) {
    res.status(500).json(err);
  }
});
 //delete
router.delete("/:id", async (req, res) => {
    try {
      await Other.findByIdAndDelete(req.params.id);
      res.status(200).json("activity has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //GET USER
router.get("/:id", async (req, res) => {
    try {
      const activity = await Other.findById(req.params.id);
      res.status(200).json(activity);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //GET ALL USER
  router.get("/",  async (req, res) => {
    const query = req.query.new;
    try {
      const activity = query
        ? await Other.find().sort({ _id: -1 }).limit(5)
        : await Other.find();
       
      res.status(200).json(activity);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //update
  router.put("/:id", async (req, res) => {
  
    try {
      const updatedActivity = await Other.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedActivity);
    } catch (err) {
      res.status(500).json(err);
    }
  });
module.exports = router;