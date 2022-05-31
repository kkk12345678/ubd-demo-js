const Router = require('express').Router;
const {body} = require('express-validator');
const userController = require('../controllers/user-controller')

const router = new Router();
//const authMiddleWare = require('../middleware/AuthMiddleware');
//const checkRoleMiddleware = require('../middleware/CheckRoleMiddleware');


router.post(
    '/registration',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    userController.registration
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);

router.get('/activate/:link', userController.activate);
router.get('/all', userController.getUsers);
router.get('/:id', userController.getUser);
router.get('/refresh', userController.refresh);


module.exports = router;