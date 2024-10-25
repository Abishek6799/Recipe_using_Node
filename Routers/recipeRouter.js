import express from "express";
import { createrecipe, deleterecipe, getallrecipe, getrecipebyid, updaterecipe } from "../Controllers/recipeController.js";


const router = express();

router.get("/getallrecipes",getallrecipe)
router.get("/getrecipe/:id",getrecipebyid)
router.post("/create",createrecipe)
router.put("/update/:id",updaterecipe)
router.delete("/delete/:id",deleterecipe)


export default router;