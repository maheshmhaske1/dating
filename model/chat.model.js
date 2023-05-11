const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId
    },
    mentorId: {
        type: mongoose.Types.ObjectId
    },
    text: {
        type: String,
        default: ''
    },
    from: {
        type: Number //1.user 2.mentor
    }
})


var chatModel = mongoose.model('chats', chatSchema);
module.exports = chatModel;