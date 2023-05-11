const mongoose = require('mongoose')

const inquirySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId
    },
    Qnt: {
        type: String
    },
    Ans: {
        type: String,
        default: ''
    },
    isAnswered: {
        type: Boolean //1.user 2.mentor
    }
})


var inquiryModel = mongoose.model('inquiry', inquirySchema);
module.exports = inquiryModel;