const User = require('../models/User');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },

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

    async createUser(req, res) {
        try {
            const dbUserData = await User.create(req.body);
            res.json(dbUserData);
        } catch (err) {
            res.status(500).json(err);
        }
    },

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

    async addFriend(req, res) {
        try {
            const addedFriend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
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

    async removeFriend(req, res) {
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