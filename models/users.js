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
}

