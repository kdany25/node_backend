import express from "express";
import HousePlan from "../models/HousePlan";

const router = express.Router();

//NEW Plan
router.post("/", async (req, res) => {
	const newHouse = new HousePlan(req.body);

	try {
		const plan = await newHouse.save();
		res.status(201).json(plan);
	} catch (err) {
		res.status(500).json(err);
	}
});
//delete
router.delete("/:id", async (req, res) => {
	try {
		await HousePlan.findByIdAndDelete(req.params.id);
		res.status(200).json("HousePlan has been deleted...");
	} catch (err) {
		res.status(500).json(err);
	}
});

//GET Plan
router.get("/:id", async (req, res) => {
	try {
		const plan = await HousePlan.findById(req.params.id);
		res.status(200).json(plan);
	} catch (err) {
		res.status(500).json(err);
	}
});

//GET ALL patient
router.get("/", async (req, res) => {
	const query = req.query.new;
	try {
		const plans = query
			? await HousePlan.find().sort({ _id: -1 }).limit(5)
			: await HousePlan.find();

		res.status(200).json(plans);
	} catch (err) {
		res.status(500).json(err);
	}
});

//update patient
router.put("/:id", async (req, res) => {
	try {
		const updatedPlan = await HousePlan.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true }
		);
		res.status(200).json(updatedPlan);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get("/week/patient", async (req, res) => {
	const date = new Date();
	const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

	try {
		const data = await HousePlan.aggregate([
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

router.get("/day/y", async (req, res) => {
	const date = new Date();
	const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

	try {
		const data = await HousePlan.aggregate([
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
	HousePlan.count({}, function (err, result) {
		if (err) {
			res.send(err);
		} else {
			res.json(result);
		}
	});
});

router.get("/today/y", async (req, res) => {
	try {
		const data = await HousePlan.find({
			timestamp: {
				$lt: new Date(),
				$gte: new Date(new Date().setDate(new Date().getDate() - 1)),
			},
		});
		res.status(200).json(data);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
