const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/export', userController.exportToExcel);

router.get('/', userController.showAddUserForm);
router.post('/create-user', userController.createUser);

module.exports = router;