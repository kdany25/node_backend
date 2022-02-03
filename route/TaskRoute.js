import express from "express";
import Task from "../models/Task";


const router = express.Router();

//NEWTASK
router.post("/newtask", async (req, res) => {
  const newTask = new Task({
    desc: req.body.desc,
    target: req.body.target,
    sector: req.body.sector,
  });

  try {
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(500).json(err);
  }
});
 //delete
router.delete("/:id", async (req, res) => {
    try {
      await Task.findByIdAndDelete(req.params.id);
      res.status(200).json("Task has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //GET USER
router.get("/:id", async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      res.status(200).json(task);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //GET ALL USER
  router.get("/",  async (req, res) => {
    const query = req.query.new;
    try {
      const tasks = query
        ? await Task.find().sort({ _id: -1 }).limit(5)
        : await Task.find();
       
      res.status(200).json(tasks);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //update
  router.put("/:id", async (req, res) => {
  
    try {
      const updatedTask = await Task.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedTask);
    } catch (err) {
      res.status(500).json(err);
    }
  });
module.exports = router;