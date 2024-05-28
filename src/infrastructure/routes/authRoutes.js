const express = require('express');
const authController = require('../../adapters/controllers/authController');

const router = express.Router();

router.get('/register', (req, res) => res.render('auth/register'));
router.post('/register', authController.register);

router.get('/login', (req, res) => res.render('auth/login'));
router.post('/login', authController.login);

router.post('/logout', authController.logout);

module.exports = router;
