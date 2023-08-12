const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    
        username: {
            Type: String,
            unique: true,
            required: true,
            trim: true,
        },

        email: {
            Type: String,
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
    }
);

const User = model('user', userSchema);

module.exports = User;