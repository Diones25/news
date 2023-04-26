import { Router } from 'express';
import newController from '../controllers/newsController.js';
import dashboardController from '../controllers/dashboardController.js';
import authController from '../controllers/authController.js';

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

//Rotas de Login
router.get('/login', authController.showLogin);
router.post('/login', authController.showLogin);
router.get('/login/create', authController.showcreate);
router.post('/login/create', authController.create);

export default router;