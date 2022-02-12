import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import express from "express";
import Mongoose from "mongoose";
import userAuth from "./route/AuthRoute"
import userRoute from "./route/UserRoute"
import houseRoute from "./route/HouseRoute"
import RoadRoute from "./route/RoadRoute"
import HealthRoute from "./route/HealthRoute"
import cors from "cors"

const app = express();
dotenv.config()

Mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log("DBconnection successfull")).catch((err)=>{console.log(err)});

app.use(cors());
app.use(express.json());
app.use("/api/auth", userAuth);
app.use("/api/users", userRoute);
app.use("/api/house", houseRoute);
app.use("/api/roads", RoadRoute);
app.use("/api/Health", HealthRoute);

app.listen(5000,()=>{
    console.log('Backend server is running')
})