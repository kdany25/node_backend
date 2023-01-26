import express from "express";
import House from "../models/House";

const router = express.Router();

//NEWHOUSE
router.post("/", async (req, res) => {
	const newHouse = new House(req.body);

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
router.get("/", async (req, res) => {
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

router.get("/week/patient", async (req, res) => {
	const date = new Date();
	const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

	try {
		const data = await House.aggregate([
			{ $match: { createdAt: { $gte: lastYear } } },
			{
				$project: {
					week: { $week: "$createdAt" },
				},
			},
			{ $group: { _id: "$week", total: { $sum: 1 } } },
			{ $sort: { total: -1 } },
		]);
		res.status(200).json(data);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get("/count/all", async (req, res) => {
	House.count({}, function (err, result) {
		if (err) {
			res.send(err);
		} else {
			res.json(result);
		}
	});
});

module.exports = router;
