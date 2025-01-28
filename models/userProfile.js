const db = require('../utils/db');

module.exports = {
  // Fetch logged-in user's name and email
  getUserProfileById: async (userId) => {
    const [rows] = await db.execute(
      `SELECT user_name, email FROM users WHERE user_id = ?`,
      [userId]
    );
    return rows[0]; // Return the first row
  },

  // Update user's name
  updateUserName: async (userId, newName) => {
    const [result] = await db.execute(
      `UPDATE users SET user_name = ? WHERE user_id = ?`,
      [newName, userId]
    );
    return result.affectedRows > 0; // True if row was updated
  },

  // Update user's password
  updateUserPasswordById: async (userId, newPassword) => {
    const [result] = await db.execute(
      `UPDATE users SET password = ? WHERE user_id = ?`,
      [newPassword, userId]
    );
    return result.affectedRows > 0; // True if row was updated
  },
};