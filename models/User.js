const { Schema, model } = require('mongoose');

// Create user schema
const userSchema = new Schema(
    {

        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            unique: true,
            required: true,
            match: [/.+@.+\..+/, "Must be a valid email address!"],
        },

        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought',
            },
        ],

        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Create a virtual that will display the number of friends in the friends array
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// Create user model using user schema
const User = model('user', userSchema);

module.exports = User;