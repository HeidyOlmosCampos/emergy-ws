const express = require('express');
const AttendCtrl = require('../controllers/attendCtrl');
const multer = require('multer');

const router = express.Router();


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.post('/create-by-image', upload.single('image'), (req, res) => AttendCtrl.createByImage(req, res));

module.exports = router;