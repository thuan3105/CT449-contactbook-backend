const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login.controller');

// Đăng nhập người dùng
router.post('/', loginController.login);

module.exports = router;
