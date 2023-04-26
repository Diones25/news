import { Router } from 'express';
import newController from '../controllers/newsController.js'

const router = Router();

router.get('/', newController.home);
router.get('/lastedNews', newController.lastedNews);
router.get('/about', newController.about);
router.get('/contact', newController.contact);

export default router;