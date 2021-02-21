const { pool } = require('./pool');

/**
 * Main query function
 * @param {String} queryString 
 * @param {Array} values 
 */
const query = async (queryString, values) => {
  try {
    const result = await pool.query(queryString, values);
    return result;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = { query };