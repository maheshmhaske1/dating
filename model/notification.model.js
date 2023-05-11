const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema({
    to: {
        type: mongoose.Types.ObjectId,
        default: ''
    },
    title: {
        type: String,
        default: ''
    },
    body: {
        type: String,
        default: ''
    },
    isRead: {
        type: Boolean,
        default: false
    }
})


var notificationModel = mongoose.model('notifications', notificationSchema);
module.exports = notificationModel;