const router = require('express').Router();
const { getUsers, getSingleUser, createUser, updateUser, deleteUser, addFriend, deleteFriend } = require('../../controllers/userController');

// Define route for viewing and creating users
router.route('/').get(getUsers).post(createUser);

// Define route for viewing single user, updating single user, and deleting single user
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// Define route for creating and deleting friends
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;