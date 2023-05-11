const { default: mongoose } = require('mongoose')
const notificationModel = require('../model/notification.model')
const userModel = require('../model/user.model')

exports.createNotification = async (req, res) => {
    const { to, title, body } = req.body

    if (!to || !title || !body) {
        return res.json({
            status: false,
            message: "to, title, body are required"
        })
    }

    const isUserExist = await userModel.findOne({ _id: mongoose.Types.ObjectId(to) })
    console.log(isUserExist)
    if (!isUserExist) {
        return res.json({
            status: false,
            message: "invalid user id"
        })
    }

    await new notificationModel({
        to: to,
        title: title,
        body: body,
        isRead: false
    })
        .save()
        .then((success) => {
            return res.json({
                status: true,
                message: "notification send",
                data: success
            })
        })
        .catch((error) => {
            return res.json({
                status: false,
                message: "something went wrong"
            })
        })
}

exports.getNotification = async (req, res) => {
    const { key, userId } = req.body


    // if (!key || !userId) {
    //     return res.json({
    //         status: false,
    //         message: "please provide kry and userId"
    //     })
    // }

    const isUserExist = await userModel.findOne({ _id: mongoose.Types.ObjectId(userId) })
    if (!isUserExist) {
        return res.json({
            status: false,
            message: "invalid user id"
        })
    }

    const data = await notificationModel.find()
    console.log(data)

    let query = {}
    let message = ``

    if (key == 0) {
        message = `All Notifications`
        query = {
            userId: mongoose.Types.ObjectId(userId),
        }
    }
    else if (key == 1) {
        message = `All unread Notifications`
        query = {
            userId: mongoose.Types.ObjectId(userId),
            isRead: false
        }
    }
    else if (key == 2) {
        message = `All read Notifications`
        query = {
            userId: mongoose.Types.ObjectId(userId),
            isRead: true
        }
    }
    else { }

    console.log(query)

    await notificationModel.find(query)
        .then((success) => {
            return res.json({
                status: true,
                message: message,
                data: success
            })
        })
        .catch((error) => {
            return res.json({
                status: false,
                message: "something went wrong"
            })
        })
}

exports.markNotificationAsRead = async (req, res) => {
    const { notificationId, userId } = req.body

    if (!notificationId || !userId) {
        return res.json({
            status: false,
            message: "notificationId and userId are required"
        })
    }

    const isUserExist = await userModel.findOne({ _id: mongoose.Types.ObjectId(userId) })
    if (!isUserExist) {
        return res.json({
            status: false,
            message: "invalid user id"
        })
    }

    const isNotificationPresent = await notificationModel.findOne({ _id: mongoose.Types.ObjectId(notificationId) })
    if (!isNotificationPresent) {
        return res.json({
            status: false,
            message: "invalid notification id"
        })
    }

    // if (isNotificationPresent.to !==mongoose.Types.ObjectId(userId) `new ObjectId(`${userId}`)`) {
    //     return res.json({
    //         status: false,
    //         message: "authorization failed"
    //     })
    // }

    if (isNotificationPresent.isRead == true) {
        return res.json({
            status: false,
            message: "notification already read"
        })
    }

    await notificationModel.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(notificationId) },
        {
            $set: { isRead: true }
        },
        { returnOriginal: false }
    )
        .then((success) => {
            return res.json({
                status: true,
                message: "notification marked as read",
                data: success
            })
        })
        .catch((error) => {
            return res.json({
                status: false,
                message: "something went wrong"
            })
        })

}

exports.markAllNotificationAsRead = async (req, res) => {
    const { userId } = req.body

    if (!userId) {
        return res.json({
            status: false,
            message: "userId is required"
        })
    }

    const isUserExist = await userModel.findOne({ _id: mongoose.Types.ObjectId(userId) })
    if (!isUserExist) {
        return res.json({
            status: false,
            message: "invalid user id"
        })
    }


    await notificationModel.findOneAndUpdate(
        { to: mongoose.Types.ObjectId(userId) },
        {
            $set: { isRead: true }
        },
        { returnOriginal: false }
    )
        .then((success) => {
            return res.json({
                status: true,
                message: "notifications marked as read",
                data: success
            })
        })
        .catch((error) => {
            return res.json({
                status: false,
                message: "something went wrong"
            })
        })

}