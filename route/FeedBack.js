import { Router } from "express";
import FeedBack from "../models/FeedBack";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const newFeedBack = new FeedBack(req.body);
    const savedFeedBack = await newFeedBack.save();
    res.status(201).json({
      status: 201,
      message: "created Successfuly",
      data: savedFeedBack,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: err,
    });
  }
});

router.get("/", async (req, res) => {

    try {
      const FeedBacks = await FeedBack.find();

      if(!FeedBacks || FeedBack[0])
      res.status(404).json({
        status:404,
        message: 'No Feedbacks Found'
      })

      res.status(200).json({
        status: 200,
        message: "Fetch Successfuly",
        data: FeedBacks,
      });
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: err,
      });
    }
  });

export default router