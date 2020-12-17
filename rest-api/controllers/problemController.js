const { problemModel } = require('../models');
const { userModel } = require('../models');
const { commentModel } = require('../models');
const { deleteOne } = require('../models/userModel');
const { newcomment } = require('./commentController');

function getproblems(req, res, next) {
    problemModel.find()
        .populate('userId')
        .populate('comments')
        .then(problems => res.json(problems))
        .catch(next);
}

function getproblem(req, res, next) {
    const problemId = req.params.id;

    problemModel.findById(problemId)
        .populate('comments')
        .populate({
            path: 'comments',
            populate: {
                path: 'userId'
            }
        })
        .populate('userId')
        .then(problem => res.json(problem))
        .catch(next);
}

function createproblem(req, res, next) {
    const { problemName, description, imageUrl } = req.body;
    const { _id: userId } = req.user;

    problemModel.create({ problemName, description, imageUrl, userId, subscribers: [userId] })
        .then(problem => {
            res.status(200).json(problem);
            // newcomment(commentText, userId, problem._id)
            //     .then(([_, updatedproblem]) => res.status(200).json(updatedproblem))
        })
        .catch(next);
}

function editProblem(req, res, next) {
    const poblemId = req.params.id;
    const { problemName, description, imageUrl } = req.body;
    const { id: userId } = req.user;

    // if the userId is not the same as this one of the comment, the comment will not be updated
    problemModel.findOneAndUpdate({ _id: poblemId, userId }, { problemName: problemName, imageUrl: imageUrl, description: description }, { new: true })
        .then(updatedpost => {
            if (updatedpost) {
                res.status(200).json(updatedpost);
            } else {
                res.status(401).json({ message: `Not allowed!` });
            }
        })
        .catch(next);
}


function deleteProblem(req, res, next) {
    const problemId = req.params.id;
    const { id: userId } = req.user;

    Promise.all([
        problemModel.findOneAndDelete({ _id: problemId }),
        commentModel.deleteMany({ "problemId": problemId }),
        userModel.findOneAndUpdate({ _id: userId }, { $pull: { problems: problemId } }),
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


function subscribe(req, res, next) {
    const problemId = req.params.problemId;
    const { _id: userId } = req.user;
    problemModel.findByIdAndUpdate({ _id: problemId }, { $addToSet: { subscribers: userId } }, { new: true })
        .then(updatedproblem => {
            res.status(200).json(updatedproblem)
        })
        .catch(next);
}

module.exports = {
    getproblems,
    createproblem,
    getproblem,
    editProblem,
    deleteProblem,
    subscribe,
}
