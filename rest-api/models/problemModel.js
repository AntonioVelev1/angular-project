const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const problemSchema = new mongoose.Schema({
    problemName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
    likes: [{
        type: ObjectId,
        ref: "User"
    }],
    userId: {
        type: ObjectId,
        ref: "User"
    },
    comments: [{
        type: ObjectId,
        ref: "comment"
    }],
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('problem', problemSchema);
