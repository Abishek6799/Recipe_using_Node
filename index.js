import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./Routers/recipeRouter.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.get("/",(req,res)=>{
    res.status(200).send("Welcome to our Api")
});

app.use('/api/recipe',router);

const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log("Server Started");
});