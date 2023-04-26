import { Router } from 'express';
import newController from '../controllers/newsController.js';
import dashboardController from '../controllers/dashboardController.js';

const router = Router();

//Rotas do Leitor
router.get('/', newController.home);
router.get('/news/:id', newController.newsDetail);
router.get('/lastedNews', newController.lastedNews);
router.get('/about', newController.about);
router.get('/contact', newController.contact);

//Rotas da Dasboard
router.get('/admin/create', dashboardController.showCreate);
router.post('/admin/create', dashboardController.create);
router.get('/admin/aprove', dashboardController.Showapprove);
router.put('/admin/aprove', dashboardController.approve);
router.get('/admin/aprove/:id', dashboardController.approveDetails);

export default router;