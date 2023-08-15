const { Schema, model, Types } = require('mongoose');

// Create schema for reactions which will exist in thought schema
const reactionSchema = new Schema(
    {

        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },

        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },

        username: {
            type: String,
            required: true,
        },

        createdAt: {
            type: Date,
            default: Date.now,
            get: function(date) {
                return date.toISOString().split("T") [0];
            },
        },
    },
    {
        toJSON: {
            getters: true,
        },
        _id: false,
        id: false,
    }
);

// Create thought schema
const thoughtSchema = new Schema(
    {

        thoughtText: {
            type: String,
            required: true,
            maxLength: 280,
        },

        createdAt: {
            type: Date,
            default: Date.now,
            get: function(date) {
                return date.toISOString().split("T") [0];
            },
        },

        username: {
            type: String,
            required: true,
        },

        reactions: [reactionSchema],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
    }
);

// Create a virtual that will display number of reactions in reactions array
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// Create thought model using thought schema
const Thought = model('thought', thoughtSchema);

module.exports = Thought;