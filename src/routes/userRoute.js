const express = require('express');
const UserCtrl = require('../controllers/userCtrl');

const router = express.Router();


router.get('/', (req, res) => UserCtrl.getAll(req, res));

module.exports = router;