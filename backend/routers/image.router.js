const express = require('express');
const router = express.Router();

const { Upload } = require('../middleware');
const { ImageController } = require('../controllers');

router.get('/:id/:name', ImageController.getImage);
router.post('/:id', Upload.array('images'), ImageController.uploadImages);
router.delete('/:id', ImageController.deleteImages);

module.exports = router;
