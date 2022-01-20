const router = require('express').Router();
const AuthController = require('../controllers/Auth');

//* REGISTER
router.post('/register', AuthController.signup);

//* LOGIN
router.post('/login', AuthController.login);

module.exports = router;
