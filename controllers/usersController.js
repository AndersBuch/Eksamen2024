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

// new code below

exports.getUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await usersModel.getUserById(userId);
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user:', error.message);
    res.status(500).send({ message: 'Failed to fetch user' });
  }
};

exports.updateUserDetails = async (req, res) => {
  const { userId, userName, email, password, isAdmin } = req.body;
  try {
    const userUpdateSuccess = await usersModel.updateUserDetails(userId, userName, email, password);
    const adminUpdateSuccess = await usersModel.setAdminStatus(userId, isAdmin);

    if (userUpdateSuccess || adminUpdateSuccess) {
      res.status(200).send({ message: 'User details updated successfully' });
    } else {
      res.status(404).send({ message: 'User not found or no changes made' });
    }
  } catch (error) {
    console.error('Error updating user details:', error.message);
    res.status(500).send({ message: 'Failed to update user details' });
  }
};

exports.deleteUserById = async (req, res) => {
  const { userId } = req.body; // Expect the userId in the request body
  try {
    console.log(`Delete request received for userId: ${userId}`); // Log the userId

    // Attempt deletion
    const success = await usersModel.deleteUserById(userId);

    if (success) {
      console.log(`User ${userId} deleted successfully`);
      return res.status(200).json({ message: 'User deleted successfully' });
    }

    console.warn(`User ${userId} not found for deletion`);
    return res.status(404).json({ message: 'User not found' });
  } catch (error) {
    console.error('Error deleting user:', error.message);
    return res.status(500).json({ message: 'Failed to delete user' });
  }
};