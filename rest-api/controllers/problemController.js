const { problemModel } = require('../models');
const { newPost } = require('./postController');

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
            path : 'posts',
            populate : {
              path : 'userId'
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
            // newPost(postText, userId, problem._id)
            //     .then(([_, updatedproblem]) => res.status(200).json(updatedproblem))
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
    subscribe,
}
