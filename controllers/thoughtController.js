const Thought = require('../models/Thought');
const User = require('../models/User');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

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

    async createThought(req, res) {
        try {
            const dbthoughtData = await Thought.create(req.body);
            const userThought = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: res.body.thoughtId } },
                { new: true }
            );
            res.json(dbthoughtData, userThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

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

    async createReaction(req, res) {
        try {
            const reaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
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

    async deleteReaction(req, res) {
        try {
            const removedReaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: req.params.reactionId } },
                { runValidators: true, new: true }
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