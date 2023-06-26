const express = require('express');
const router = express.Router();
const FileUploadController = require('../controller/FileUploadController');

router.post('/upload', FileUploadController.uploadFile);
router.get('/find', FileUploadController.getallfile);

module.exports = router;