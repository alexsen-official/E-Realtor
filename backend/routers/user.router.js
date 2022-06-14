const express = require('express');
const router = express.Router();

const { UserController } = require('../controllers');

router.get('/:id', UserController.getUser);
router.get('/', UserController.getAllUsers);
router.post('/', UserController.createUser);
router.post('/login', UserController.loginUser);
router.put('/', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

module.exports = router;
