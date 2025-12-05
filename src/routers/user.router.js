import { Router } from "express";
import { createUser, getUser, loginUser } from "../controllers/user-controller.js";

const router = Router();




router.post("/create",createUser)
router.post("/login",loginUser)
router.get("/get/:email",getUser)



export default router
