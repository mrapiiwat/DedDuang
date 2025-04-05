import { Router } from "express";
import authorizeAdmin from "../../../common/middleware/authorizeAdmin";
import * as newsController from "../controller/news.controller";
const router = Router();

router.get("/news", newsController.getNews);
router.post("/news", authorizeAdmin, newsController.createNews);
router.delete("/news", authorizeAdmin, newsController.deleteNews);

export default router;
