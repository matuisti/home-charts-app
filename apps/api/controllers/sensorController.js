const express = require('express');
const sensorController = express.Router();
const { insertSensorData, getSensorData } = require('../services/sensorService');

sensorController.post('/insert-sensor-data', async (req, res) => {
  const { deviceId, temperature, humidity, voltage } = req.query;
  try {
    await insertSensorData({ deviceId, temperature, humidity, voltage });
    res.json({status: 'success'});
  } catch (error) {
    console.log(error)
    res.status(500).json(error);
  }
});

sensorController.get('/get-sensor-data', async (req, res) => {
  try {
    const sensorData = await getSensorData();
    res.json(sensorData);
  } catch (error) {
    console.log(error)
    res.status(500).json(error);
  }
});

module.exports = sensorController;