import express from "express";
import House from "../models/House";


const router = express.Router();

//NEWHOUSE
router.post("/newHouse", async (req, res) => {
  const newHouse = new House({
    desc: req.body.desc,
    target: req.body.target,
    sector: req.body.sector,
  });

  try {
    const savedHouse = await newHouse.save();
    res.status(201).json(savedHouse);
  } catch (err) {
    res.status(500).json(err);
  }
});
 //delete
router.delete("/:id", async (req, res) => {
    try {
      await House.findByIdAndDelete(req.params.id);
      res.status(200).json("House has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //GET USER
router.get("/:id", async (req, res) => {
    try {
      const house = await House.findById(req.params.id);
      res.status(200).json(house);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //GET ALL USER
  router.get("/",  async (req, res) => {
    const query = req.query.new;
    try {
      const houses = query
        ? await House.find().sort({ _id: -1 }).limit(5)
        : await House.find();
       
      res.status(200).json(houses);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //update
  router.put("/:id", async (req, res) => {
  
    try {
      const updatedHouse = await House.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedHouse);
    } catch (err) {
      res.status(500).json(err);
    }
  });
module.exports = router;