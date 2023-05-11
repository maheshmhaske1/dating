const jwt = require('jsonwebtoken');
require('dotenv').config()

const { SECRET_KEY_USER, SECRET_KEY_ASTRO } = process.env


// ------------- generate jwt token for patient ------------- //
exports.generate_token_user = async (_id, username) => {

    const token = await jwt.sign(
        { patient_id: _id, username },
        SECRET_KEY_USER,
        {
            expiresIn: "365d",
        }
    );
    return token
}

// ------------- authenticate jwt token for User ------------- //
exports.authenticate_user = (req, res, next) => {
    let token = req.headers.authorization

    if (token)
        token = token.split(" ")[1]
    else if (token == undefined || token == null)
        token = req.body.token
            || req.query.token
            || req.headers["x-access-token"]
    else
        return res.json({
            Message_code: 999,
            Message_text: "please provide jwt token"
        })

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY_USER);
        req.user = decoded;
    } catch (err) {
        return res.json({
            status: false,
            message: "Please provide valid JWT token for user"
        })
    }
    return next();
};




exports.generate_token_austro = async (_id, username) => {

    const token = await jwt.sign(
        { patient_id: _id, username },
        SECRET_KEY_ASTRO,
        {
            expiresIn: "365d",
        }
    );
    return token
}

// ------------- authenticate jwt token for Admin ------------- //
exports.authenticate_austro = (req, res, next) => {
    let token = req.headers.authorization

    if (token)
        token = token.split(" ")[1]
    else if (token == undefined || token == null)
        token = req.body.token
            || req.query.token
            || req.headers["x-access-token"]
    else
        return res.json({
            Message_code: 999,
            Message_text: "please provide jwt token"
        })

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY_ASTRO);
        req.user = decoded;
    } catch (err) {
        return res.json({
            status: false,
            message: "Please provide valid JWT token for astrologer"
        })
    }
    return next();
};