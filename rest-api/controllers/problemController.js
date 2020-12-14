const { problemModel } = require('../models');
const { userModel } = require('../models');
const { commentModel } = require('../models');
const { deleteOne } = require('../models/userModel');
const { newcomment } = require('./commentController');

function getproblems(req, res, next) {
    problemModel.find()
        .populate('userId')
        .then(problems => res.json(problems))
        .catch(next);
}

function getproblem(req, res, next) {
    const { problemId } = req.params;

    problemModel.findById(problemId)
        .populate({
            path: 'comments',
            populate: {
                path: 'userId'
            }
        })
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

function deleteProblem(req, res, next) {
    const problemId = req.params;
    const { id: userId } = req.user;

    Promise.all([
        problemModel.findOneAndDelete({ id: problemId, userId }),
        userModel.findOneAndUpdate({ _id: userId }, { $pull: { problems: problemId } }),
    ])
        .then(([deletedOne, te, test]) => {
            if (deletedOne) {
                res.status(200).json(deletedOne);
            } else {
                res.status(401).json({ message: 'Not allowed!' })
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
    deleteProblem,
    subscribe,
}
