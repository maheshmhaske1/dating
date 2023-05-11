const mongoose = require('mongoose')

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        default: ''
    },
    otp: {
        type: Number,
        default: ''
    },
    validTill: {
        type: Number,
        default: ''
    }
})


var otpModel = mongoose.model('otps', otpSchema);
module.exports = otpModel;