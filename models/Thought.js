const { Schema, model } = require('mongoose');

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
            get: function(createdAt) {
                return createdAt;
            },
        },
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
    }
);

const thoughtSchema = new Schema(
    {

        thought: {
            type: String,
            required: true,
            maxLength: 280,
        },

        createdAt: {
            type: Date,
            default: Date.now,
            get: function(createdAt) {
                return createdAt;
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

reactionSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;