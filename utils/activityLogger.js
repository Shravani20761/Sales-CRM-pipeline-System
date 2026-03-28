const { pool } = require('../config/db');

async function logActivity(userId, action, entityType, entityId) {
  try {
    await pool.query(
      'INSERT INTO activities (user_id, action, entity_type, entity_id) VALUES ($1, $2, $3, $4)',
      [userId, action, entityType, entityId]
    );
  } catch (err) {
    console.error('Error logging activity:', err.message);
  }
}

module.exports = logActivity;
