import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import express from "express";
import Mongoose from "mongoose";
import userAuth from "./route/AuthRoute";
import userRoute from "./route/UserRoute";
import houseRoute from "./route/HouseRoute";
import RoadRoute from "./route/RoadRoute";
import HealthRoute from "./route/HealthRoute";
import HealthPlanRoute from "./route/HealthPlanRoute";
import RoadsPlanRoute from "./route/RoadsPlanRoute";
import HousePlanRoute from "./route/HousePlanRoute";
import Report from "./route/ReportRoute";
import FeedBack from "./route/FeedBack";
import cors from "cors";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3001;

Mongoose.connect(process.env.MONGO_URL)
	.then(() => console.log("DataBase connection successfull"))
	.catch((err) => {
		console.log(err);
	});

app.use(cors());
app.use(express.json());

app.use("/api/auth", userAuth);
app.use("/api/users", userRoute);
app.use("/api/house", houseRoute);
app.use("/api/roads", RoadRoute);
app.use("/api/Health", HealthRoute);
app.use("/api/HealthPlan", HealthPlanRoute);
app.use("/api/RoadsPlan", RoadsPlanRoute);
app.use("/api/HousePlan", HousePlanRoute);
app.use("/api/feedback", FeedBack);
app.use("/api/Report", Report);
app.use("/api/Report", Report);

app.listen(PORT, () => {
	console.log(" military outReach backend has started ");
});
