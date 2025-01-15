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

exports.setAdminStatus = async (req, res) => {
  const { userId, isAdmin } = req.body;
  try {
    const success = await usersModel.setAdminStatus(userId, isAdmin);
    if (success) {
      res.status(200).send({ message: 'Admin status updated successfully' });
    } else {
      res.status(404).send({ message: 'User not found or no changes made' });
    }
  } catch (error) {
    console.error('Error updating admin status:', error.message);
    res.status(500).send({ message: 'Failed to update admin status' });
  }
};