import { Router } from "express";
import multer from "multer";
import {
  createLeave,
  createUser,
  getLeave,
  getUser,
  loginUser,
  profileUpdate,
} from "../controllers/user-controller.js";

const router = Router();
const upload = multer({ dest: "uploads/" }); // simple storage

router.post("/create", upload.single("profileImage"), createUser);
router.post("/login", loginUser);
router.get("/get/:email", getUser);
router.post("/leaceAplication", createLeave);
router.get("/leave/:email", getLeave);

// ✅ ADD THIS ↓ (important)
router.patch("/update/:email", upload.single("image"), profileUpdate);

export default router;
