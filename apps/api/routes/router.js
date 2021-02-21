var express = require('express');
const router = express.Router();
const sensorController = require('../controllers/sensorController');

router.use('/dht', sensorController);

module.exports = router;
