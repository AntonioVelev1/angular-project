const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    likes: [{
        type: ObjectId,
        ref: "User"
    }],
    userId: {
        type: ObjectId,
        ref: "User"
    },
    problemId: {
        type: ObjectId,
        ref: "problem"
    },
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('comment', commentSchema);
