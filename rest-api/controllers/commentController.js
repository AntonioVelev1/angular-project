const { userModel, problemModel, commentModel } = require('../models');

function newcomment(text, userId, problemId) {
    return commentModel.create({ text, userId, problemId })
        .then(comment => {
            return Promise.all([
                userModel.updateOne({ _id: userId }, { $push: { comments: comment._id }, $addToSet: { problems: problemId } }),
                problemModel.findByIdAndUpdate({ _id: problemId }, { $push: { comments: comment._id }, $addToSet: { subscribers: userId } }, { new: true })
            ])
        })
}

function getLatestscomments(req, res, next) {
    const limit = Number(req.query.limit) || 0;

    commentModel.find()
        .sort({ created_at: -1 })
        .limit(limit)
        .populate('problemId userId')
        .then(comments => {
            res.status(200).json(comments)
        })
        .catch(next);
}

function createcomment(req, res, next) {
    const { problemId, userId, text } = req.body;

    newcomment(text, userId, problemId)
        .then(([_, updatedproblem]) => res.status(200).json(updatedproblem))
        .catch(next);
}

function editcomment(req, res, next) {
    const commentId = req.params.id;
    const comment = req.body.content.comment;
    const { _id: userId } = req.body.user;
 
    // if the userId is not the same as this one of the comment, the comment will not be updated
    commentModel.findOneAndUpdate({ _id: commentId, userId }, { text: comment }, { new: true })
        .then(updatedcomment => {
            if (updatedcomment) {
                res.status(200).json(updatedcomment);
            } else {
                res.status(401).json({ message: `Not allowed!` });
            }
        })
        .catch(next);
}

function deletecomment(req, res, next) {
    const original = req.originalUrl;
    const arr = original.split('/');
    const queryParams = arr[4];
    const firstStep = queryParams.split('?');
    const commentId = firstStep[0];
    const secondStep = firstStep[1].split('=');
    const userId = secondStep[2];
    const thirthStep = secondStep[1].split('&');
    const problemId = thirthStep[0];
 
 
    Promise.all([
            commentModel.findOneAndDelete({ _id: commentId, userId }),
            userModel.findOneAndUpdate({ _id: userId }, { $pull: { comments: commentId } }),
            problemModel.findOneAndUpdate({ _id: problemId }, { $pull: { comments: commentId } }),
        ])
        .then(([deletedOne, _, __]) => {
            if (deletedOne) {
                res.status(200).json(deletedOne)
            } else {
                res.status(401).json({ message: `Not allowed!` });
            }
        })
        .catch(next);
}

function like(req, res, next) {
    const { commentId } = req.params;
    const { _id: userId } = req.user;

    console.log('like')

    commentModel.updateOne({ _id: commentId }, { $addToSet: { likes: userId } }, { new: true })
        .then(() => res.status(200).json({ message: 'Liked successful!' }))
        .catch(next)
}

module.exports = {
    getLatestscomments,
    newcomment,
    createcomment,
    editcomment,
    deletecomment,
    like,
}
