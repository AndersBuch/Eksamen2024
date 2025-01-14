const db = require('../utils/db');

module.exports = {

  getAllUsersFromDatabase: async () => {
    const [rows] = await db.execute(`SELECT user_id, user_name, email, admin FROM users ORDER BY user_name ASC`);
    return rows;
  },



}