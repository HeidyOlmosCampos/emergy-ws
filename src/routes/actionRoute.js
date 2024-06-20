const express = require('express');

const ActionCtrl = require('../controllers/actionCtrl');
const router = express.Router();


router.get('/all-by-emergencyId/:emergency_id', (req, res) => ActionCtrl.getAllByEmergencyId(req, res));

router.post('/create-actions', (req, res) => ActionCtrl.createActions(req, res));


module.exports = router;