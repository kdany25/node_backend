import express from "express";
import Roads from "../models/Roads";

const router = express.Router();

//NEW
router.post("/", async (req, res) => {
  const newaction = new Roads(req.body);

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
    await Roads.findByIdAndDelete(req.params.id);
    res.status(200).json("activity has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER
router.get("/:id", async (req, res) => {
  try {
    const activity = await Roads.findById(req.params.id);
    res.status(200).json(activity);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL USER
router.get("/", async (req, res) => {
  const query = req.query.new;
  try {
    const activity = query
      ? await Roads.find().sort({ _id: -1 }).limit(5)
      : await Roads.find();

    res.status(200).json(activity);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update
router.put("/:id", async (req, res) => {
  try {
    const updatedActivity = await Roads.findByIdAndUpdate(
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

router.get("/week/patient", async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await Roads.aggregate([
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

router.get("/count/all", async (req, res) => {
  Roads.count({}, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});


router.get("/week/sum", async (req, res) => {
  try {
    const data = await Roads.aggregate([
      {
        $group: {
          _id: "$Roads",
          total: { $sum: "$kmreached" },
      
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
