const userProfileModel = require('../models/userProfile');


// Get the logged-in user's profile
exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.session.userId; // Get logged-in user's ID from the session

    if (!userId) {
      return res.status(401).send("Unauthorized: No user is logged in.");
    }

    // Fetch user details
    const user = await userProfileModel.getUserProfileById(userId);
    if (!user) {
      return res.status(404).send("User not found.");
    }

    res.status(200).json(user); // Send user data as JSON
  } catch (error) {
    console.error("Error fetching user profile:", error.message);
    res.status(500).send("Internal Server Error");
  }
};

// Update the user's profile (name and/or password)
exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.session.userId; // Get logged-in user's ID
    const { newName, newPassword, confirmPassword } = req.body;

    if (!userId) {
      return res.status(401).send("Unauthorized: No user is logged in.");
    }

    // Update name if provided
    if (newName) {
      const nameUpdated = await userProfileModel.updateUserName(userId, newName);
      if (!nameUpdated) {
        return res.status(500).send("Failed to update name.");
      }
    }

    // Update password if provided
    if (newPassword || confirmPassword) {
      if (newPassword !== confirmPassword) {
        return res.status(400).send("Passwords do not match.");
      }
      const passwordUpdated = await userProfileModel.updateUserPasswordById(
        userId,
        newPassword
      );
      if (!passwordUpdated) {
        return res.status(500).send("Failed to update password.");
      }
    }

    res.status(200).send("Profile updated successfully.");
  } catch (error) {
    console.error("Error updating user profile:", error.message);
    res.status(500).send("Internal Server Error");
  }
};