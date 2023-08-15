const Thought = require('../models/Thought');
const User = require('../models/User');

module.exports = {
    // Return all documents from thoughts table
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Return single document from thought table
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
                .select('-__v');

            if (!thought) {
                return res.status(404).json({ message: "No user found with that ID" });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Add new thought to thought table
    async createThought(req, res) {
        try {
            const newThought = await Thought.create(req.body);

            const addThoughtToUser = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: newThought._id } },
                { new: true }
            );

            res.json(newThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Update document in thought table
    async updateThought(req, res) {
        try {
            const updatedThought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!updatedThought) {
                return res.status(404).json({ message: "No thought found with this ID" });
            }

            res.json(updatedThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Delete document from thought table
    async deleteThought(req, res) {
        try {
            const deletedThought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

            if (!deletedThought) {
                return res.status(404).json({ message: "No thought found with this ID" });
            }

            res.json(deletedThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Add new reaction to reaction array in document in thought table
    async createReaction(req, res) {
        try {
            const reaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $push: { reactions: req.body } },
                { runValidators: true, new: true }
            );

            if (!reaction) {
                return res.status(404).json({ message: "No thought found with this ID" });
            }

            res.json(reaction);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Delete reaction from reaction array from document in thought table
    async deleteReaction(req, res) {
        try {
            const removedReaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.body.reactionId } } },
                { new: true }
            );

            if (!removedReaction)
            {
                return res.status(404).json({ message: 'No thought with this id!' });
            }

            res.json(removedReaction);
        } catch (err) {
            res.status(500).json(err);
        }
    },
}

// To Do

// README