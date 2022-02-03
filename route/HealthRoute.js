import express from "express";
import Health from "../models/Health";


const router = express.Router();

//NEW Patient
router.post("/newActivity", async (req, res) => {
  const newHealth = new Health({
    desc: req.body.desc,
    address: req.body.address,
    sector: req.body.sector,
  });

  try {
    const patient = await newHealth.save();
    res.status(201).json(patient);
  } catch (err) {
    res.status(500).json(err);
  }
});
 //delete
router.delete("/:id", async (req, res) => {
    try {
      await Health.findByIdAndDelete(req.params.id);
      res.status(200).json("Health has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //GET Patient
router.get("/:id", async (req, res) => {
    try {
      const patient = await Health.findById(req.params.id);
      res.status(200).json(patient);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //GET ALL patient
  router.get("/",  async (req, res) => {
    const query = req.query.new;
    try {
      const patients = query
        ? await Health.find().sort({ _id: -1 }).limit(5)
        : await Health.find();
       
      res.status(200).json(patients);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //update patient
  router.put("/:id", async (req, res) => {
  
    try {
      const updatedPatient = await Health.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedPatient);
    } catch (err) {
      res.status(500).json(err);
    }
  });
module.exports = router;