const otpModel = require('../model/otp.model')
const mailMiddleware = require('../middleware/mail.middleware')

exports.sendOtp = async (req, res) => {
    const { email } = req.body
    const otp = Math.floor(100000 + Math.random() * 900000)

    if (!email) {
        return res.json({
            success: false,
            message: "please enter email"
        })
    }

    const isEmailSent = await mailMiddleware.sendMail(email, 'Otp Verification', `your otp is - ${otp}`)

    await new otpModel({
        email: email,
        otp: otp,
        validTill: (Date.now() + 600000)
    }).save()
        .then((success) => {
            return res.json({
                success: true,
                message: `email sent on ${email}`
            })
        })
        .catch((error) => {
            return res.json({
                success: false,
                message: "something went wrong"
            })
        })
}

exports.verifyOtp = async (req, res) => {
    const { email, otp } = req.body

    if (!email) {
        return res.json({
            success: false,
            message: "please enter email"
        })
    }

    await otpModel.findOne({ email: email }).sort({ _id: -1 })
        .then((success) => {
            if (!success) {
                return res.json({
                    success: false,
                    message: `record not found`
                })
            }
            else {
                if (otp == success.otp && success.validTill > Date.now()) {
                    return res.json({
                        success: true,
                        message: "otp matched"
                    })
                }
                else if (otp == success.otp && success.validTill < Date.now()) {
                    return res.json({
                        success: false,
                        message: "otp expired"
                    })
                }
                else {
                    return res.json({
                        success: false,
                        message: "otp not matched"
                    })
                }
            }
        })
        .catch((error) => {
            return res.json({
                success: false,
                message: "something went wrong", error
            })
        })
}