import { Router } from "express";
import * as authController from "../controller/auth.controller";
import { upload } from "../../../common/middleware/upload";
const router = Router();

router.post("/register", upload.single("image"), authController.register);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

export default router;
