const User = require('../models/User');

module.exports = {

    // Return all documents from user table
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Return single document from user table
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .select('-__v');
            
            if (!user)
            {
                return res.status(404).json({ message: "No user found with that ID" });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Add new user to user table
    async createUser(req, res) {
        try {
            const dbUserData = await User.create(req.body);
            res.json(dbUserData);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Update document in user table
    async updateUser(req, res) {
        try {
            const updatedUser = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!updatedUser)
            {
                return res.status(404).json({ message: "No user found with this ID" });
            }

            res.json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Delete document in user table
    async deleteUser(req, res) {
        try {
            const deletedUser = await User.findOneAndRemove({ _id: req.params.userId });

            if (!deletedUser)
            {
                return res.status(404).json({ message: "No user found with this ID" });
            }

            res.json(deletedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Add new friend to friends array in document in user table
    async addFriend(req, res) {
        try {
            const addedFriend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $push: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            );

            if (!addedFriend)
            {
                return res.status(404).json({ message: 'No friend with this id!' });
            }

            res.json(addedFriend);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Delete friend from friends array from document in user table
    async deleteFriend(req, res) {
        try {
            const removedFriend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            );

            if (!removedFriend)
            {
                return res.status(404).json({ message: 'No friend with this id!' });
            }

            res.json(removedFriend);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};