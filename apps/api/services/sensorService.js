const { query } = require('../database/dbQuery');

const insertSensorData = async (sensorData) => {
  const { deviceId, temperature, humidity, voltage } = sensorData;
  const queryString = `INSERT INTO 
    sensor_data (device_id, created_at, temperature, humidity, voltage) 
    VALUES($1, $2, $3, $4, $5)`;
  const now = Date.now();
  const values = [
    deviceId,
    now,
    temperature,
    humidity,
    voltage
  ];
  try {
    const { rows } = await query(queryString, values);
    return rows;
  } catch (error) {
    throw new Error(error);
  }
};

const getSensorData = async () => {
  const queryString = `SELECT * FROM sensor_data`;
  try {
    const { rows } = await query(queryString);
    return rows;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  insertSensorData,
  getSensorData
}