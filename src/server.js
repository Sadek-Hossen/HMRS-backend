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

// DiskStorage এর পরিবর্তে MemoryStorage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/create", upload.single("profileImage"), createUser);
router.post("/login", loginUser);
router.get("/get/:email", getUser);
router.post("/leaceAplication", createLeave);
router.get("/leave/:email", getLeave);

// Profile update route
router.patch("/update/:email", upload.single("image"), profileUpdate);

export default router;
