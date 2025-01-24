const db = require('../utils/db');

module.exports = {

  getAllUsersFromDatabase: async () => {
    const [rows] = await db.execute(`SELECT user_id, user_name, email, admin FROM users ORDER BY user_name ASC`);
    return rows;
  },

  setAdminStatus: async (userId, isAdmin) => {
    const [result] = await db.execute(`UPDATE users SET admin = ? WHERE user_id = ?`, [isAdmin ? 1 : 0, userId]);
    return result.affectedRows > 0; // Return true if a row was updated
  },

// new code below

  getUserById: async (userId) => {
    const [rows] = await db.execute(
      `SELECT user_id, user_name, email, password, admin FROM users WHERE user_id = ?`,
      [userId]
    );
    return rows[0]; // Return the first row if it exists
  },

  updateUserDetails: async (userId, userName, email, password) => {
    const [result] = await db.execute(
      `UPDATE users SET user_name = ?, email = ?, password = ? WHERE user_id = ?`,
      [userName, email, password, userId]
    );
    return result.affectedRows > 0; // Return true if a row was updated
  },

  deleteUserById: async (userId) => {
    const [result] = await db.execute(`DELETE FROM users WHERE user_id = ?`, [userId]);
    console.log('Delete result:', result); // Log the raw query result
    return result.affectedRows > 0; // Returns true if a row was deleted
  },
}

