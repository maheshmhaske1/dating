const { default: mongoose } = require('mongoose')
const tasks = require('../model/task.model')

exports.addTask = async (req, res) => {
    const task = req.body.task

    if (!task) {
        return res.json({
            status: false,
            message: "please enter task name"
        })
    }

    await new tasks({
        task: task
    })
        .save()
        .then((success) => {
            return res.json({
                success: true,
                message: `Task added`,
                data: success
            })
        })
        .catch((error) => {
            return res.json({
                success: false,
                message: "something went wrong", error
            })
        })
}

exports.deleteTask = async (req, res) => {
    const taskId = req.params.taskId

    if (!taskId) {
        return res.json({
            status: false,
            message: "please enter taskId"
        })
    }

    await tasks.findOneAndDelete({
        _id: mongoose.Types.ObjectId(taskId)
    })
        .then((success) => {
            return res.json({
                success: true,
                message: `Task deleted`,
                data: success
            })
        })
        .catch((error) => {
            return res.json({
                success: false,
                message: "something went wrong", error
            })
        })
}

exports.getAll = async (req, res) => {
    await tasks.find()
        .then((success) => {
            return res.json({
                success: true,
                message: `Task details`,
                data: success
            })
        })
        .catch((error) => {
            return res.json({
                success: false,
                message: "something went wrong", error
            })
        })
}