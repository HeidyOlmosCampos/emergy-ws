const express = require('express');
const ChargeCtrl = require('../controllers/chargeCtrl');

const router = express.Router();


router.get('/', (req, res) => ChargeCtrl.getAll(req, res));

module.exports = router;