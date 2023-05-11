const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        default: ''
    },
    last_name: {
        type: String,
        default: ''
    },
    profession: {
        type: Number,
    },
    interest: {
        type: []
    },
    gender:{
        type:Number
    },
    email: {
        type: String,
        default: ''
    },
    mobile: {
        type: Number,
        default: ''
    },
    token: {
        type: String
    },
    displayPhoto: {
        type: String
    },
    password: {
        type: String
    },
    coin: {
        type: Number
    },
    location:{type:Number},
    lng: { type: Number },
    ltd: { type: Number },
    referalCode: {
        type: String
    }

})


var userModel = mongoose.model('users', userSchema);
module.exports = userModel;