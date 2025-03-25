import { Router } from 'express';
import * as newsController from '../controller/news.controller';
const router = Router();

router.get('/news', newsController.getNews);  
router.post('/news', newsController.createNews);  
router.delete('/news', newsController.deleteNews);  

export default router;