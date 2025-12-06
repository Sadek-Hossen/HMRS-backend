import { Router } from "express";
import { createLeave, createUser, getLeave, getUser, loginUser } from "../controllers/user-controller.js";

const router = Router();




router.post("/create",createUser)
router.post("/login",loginUser)
router.get("/get/:email",getUser)
router.post("/leaceAplication",createLeave)
router.get("/leave/:email",getLeave)



export default router
