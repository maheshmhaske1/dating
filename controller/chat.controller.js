const { default: mongoose } = require('mongoose')
const chat = require('../model/chat.model')
const user = require('../model/user.model')

exports.add = async (req, res) => {
    const { userId, mentorId, text, from } = req.body

    console.log(req.body)

    if (!userId || !mentorId) {
        return res.json({
            status: false,
            message: "userId and mentorId required"
        })
    }

    await new chat({
        userId: userId,
        mentorId: mentorId,
        text: text,
        from: from
    })
        .save()
        .then(success => {
            return res.json({
                status: true,
                message: "message added",
                data: success
            })
        })
        .catch(error => {
            return res.json({
                status: false,
                message: "something went wrong", error
            })
        })

}

exports.deleteMessage = async (req, res) => {
    const { messageId } = req.params

    if (!messageId) {
        return res.json({
            status: false,
            message: "please provide messageId"
        })
    }

    const isMesagePresent = await chat.findOne({ _id: mongoose.Types.ObjectId(messageId) })
    if (!isMesagePresent) {
        return res.json({
            status: false,
            message: "please provide valid messageId"
        })
    }

    await chat.findOneAndDelete({ _id: mongoose.Types.ObjectId(messageId) })
        .then(success => {
            return res.json({
                status: true,
                message: "message deleted",
                data: success
            })
        })
        .catch(error => {
            return res.json({
                status: false,
                message: "something went wrong"
            })
        })
}

exports.getChat = async (req, res) => {
    const { userId, mentorId, key } = req.body

    if (!key) {
        return res.json({
            status: false,
            message: "please provide key"
        })
    }

    if (key == 1) {
        if (!userId) {
            return res.json({
                status: false,
                message: "please provide userId"
            })
        }

        const isUserExist = await user.findOne({ _id: mongoose.Types.ObjectId(userId) })
        if (!isUserExist) {
            return res.json({
                status: false,
                message: "please provide valid userId"
            })
        }

        await chat.aggregate([
            { $match: { userId: mongoose.Types.ObjectId(userId) } },
            {
                $lookup: {
                    from: "users",
                    foreignField: "_id",
                    localField: "userId",
                    as: "userDetails"
                }
            },
            {
                $project: {
                    _id: 0,
                    userId: "$userId",
                    first_name: { $arrayElemAt: ["$userDetails.first_name", 0] }
                }
            },
            { $group: { _id: "$userId", first_name: { $first: "$first_name" } } }
        ])
            .then(success => {
                return res.json({
                    status: true,
                    message: "chat Details",
                    data: success
                })
            })
            .catch(error => {
                return res.json({
                    status: false,
                    message: "something went wrong"
                })
            })
    }

    if (key == 2) {
        if (!mentorId) {
            return res.json({
                status: false,
                message: "please provide mentorId"
            })
        }

        await chat.aggregate([
            { $match: { mentorId: mongoose.Types.ObjectId(mentorId) } },
            {
                $lookup: {
                    from: "users",
                    foreignField: "_id",
                    localField: "userId",
                    as: "userDetails"
                }
            },
            {
                $project: {
                    _id: 0,
                    userId: "$userId",
                    first_name: { $arrayElemAt: ["$userDetails.first_name", 0] }
                }
            },
            { $group: { _id: "$userId", first_name: { $first: "$first_name" } } }
        ])
            .then(success => {
                return res.json({
                    status: true,
                    message: "chat Details",
                    data: success
                })
            })
            .catch(error => {
                return res.json({
                    status: false,
                    message: "something went wrong"
                })
            })
    }


    // await chat.find({ userId: mongoose.Types.ObjectId(userId) }).distinct("mentorId")

}

exports.getChatBetween = async (req, res) => {
    const { userId, adminId } = req.body

    if (!userId || !adminId) {
        return res.json({
            status: false,
            message: "userId and mentorId required"
        })
    }

    const isUserExist = await user.findOne({ _id: mongoose.Types.ObjectId(userId) })
    if (!isUserExist) {
        return res.json({
            status: false,
            message: "please provide valid userId"
        })
    }

    await chat.find({ userId: mongoose.Types.ObjectId(userId), mentorId: mongoose.Types.ObjectId(adminId) })
        .then(success => {
            return res.json({
                status: true,
                message: "chat history",
                data: success
            })
        })
        .catch(error => {
            return res.json({
                status: false,
                message: "something went wrong"
            })
        })
}