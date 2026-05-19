import { Router } from "express";
import { mockLogin } from "../controllers/auth.controller.js";

const router = Router();
router.post("/login", mockLogin);

export default router;
