import express from "express";
import Health from "../models/Health";


const router = express.Router();

//NEW Patient
router.post("/", async (req, res) => {
  const newHealth = new Health( req.body);

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


  router.get("/week/patient",  async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  
    try {
      const data = await Health.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
          $project: {
            week: { $week: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$week",
            total: { $sum: 1 },
          },
        },
      ]);
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get("/day/y",  async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  
    try {
      const data = await Health.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
          $project: {
            week: { $week: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$week",
            total: { $sum: 1 },
          },
        },
      ]);
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get("/count/all",  async (req, res) => {
    Health.count( {}, function(err, result){

      if(err){
          res.send(err)
      }
      else{
          res.json(result)
      }

 })
  })

  router.get("/today/y",  async (req, res) => {
    try {
      const data = await Health.find({ 
        "timestamp" : { 
          $lt: new Date(), 
          $gte: new Date(new Date().setDate(new Date().getDate()-1))
        }   
      })
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;