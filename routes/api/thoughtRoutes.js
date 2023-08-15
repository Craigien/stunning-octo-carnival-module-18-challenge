const router = require('express').Router();
const { getThoughts, getSingleThought, createThought, updateThought, deleteThought, createReaction, deleteReaction } = require('../../controllers/thoughtController');

// Define route for viewing and creating thoughts
router.route('/').get(getThoughts).post(createThought);

// Define route for viewing single thought, updating single thought, and deleting single thought
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// Define route for creating and deleting reactions
router.route('/:thoughtId/reactions').post(createReaction).delete(deleteReaction);

module.exports = router;