const express = require('express');
const router = express.Router();

const { PropertyController } = require('../controllers');

router.get('/:id', PropertyController.getProperty);
router.get('/', PropertyController.getAllProperties);
router.post('/', PropertyController.createProperty);
router.put('/', PropertyController.updateProperty);
router.delete('/:id', PropertyController.deleteProperty);

module.exports = router;
