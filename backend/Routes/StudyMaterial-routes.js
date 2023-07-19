const express = require('express');
const StudyMaterialController = require('../controllers/StudyMaterial-controllers');
const fileUpload = require('../middleware/material-upload');

const router = express.Router();

// Route for fetching all files
router.get('/files', StudyMaterialController.getFiles);

// Route for uploading a file
router.post('/add', fileUpload.single('file'), StudyMaterialController.addFile);

// Route for deleting a file by ID
router.delete('/files/:id', StudyMaterialController.deleteFileById);

module.exports = router;
