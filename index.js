import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import express from "express";
import Mongoose from "mongoose";
import userAuth from "./route/AuthRoute"
import userRoute from "./route/UserRoute"


const app = express();
dotenv.config()

Mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log("DBconnection successfull")).catch((err)=>{console.log(err)});


app.use(express.json());
app.use("/api/auth", userAuth);
app.use("/api/users", userRoute);


app.listen(6000,()=>{
    console.log('Backend server is running')
})