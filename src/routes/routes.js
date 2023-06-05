const { Router } = require('express');
const newController = require('../controllers/newsController.js');
const dashboardController = require('../controllers/dashboardController.js');
const authController = require('../controllers/AuthController.js');
const checkAuth = require('../middlewares/checkAuth.js');
const upload = require('../middlewares/upload.js');

const router = Router();

//Rotas do Leitor
router.get('/', newController.home);
router.get('/news/:id', newController.newsDetail);
router.get('/lastedNews', newController.lastedNews);
router.get('/about', newController.about);
router.get('/contact', newController.contact);

//Rotas da Dasboard
router.get('/admin/create', checkAuth, dashboardController.showCreate);
router.post('/admin/create', checkAuth, upload.single("imagem"),dashboardController.create);

router.get('/admin/aprove', checkAuth, dashboardController.Showapprove);
router.post('/admin/aprove', dashboardController.approve);
router.post('/admin/remove', dashboardController.remove);

router.get('/admin/aprove/:id', dashboardController.approveDetails);

//Rotas de Login
router.get('/signin', authController.signin);
router.get('/signup', authController.signup);

router.post('/signin', authController.signinCreate);
router.post('/signup', authController.signupCreate);

router.get('/logout', authController.logout);
module.exports = router;