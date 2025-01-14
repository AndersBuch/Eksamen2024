const usersModel = require('../models/users'); // DB model for groups


exports.getAllUsersFromDatabase = async (req, res) => {
  try {
    const users = await usersModel.getAllUsersFromDatabase(); // Fetch users here
    res.render('users', { title: 'All users', users});
  } catch (error) {
    console.error('Error fetching users:', error.message);
    res.status(500).send('Failed to fetch data.');
  }
};