const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const authMiddleware = (req, res, next) => {
    console.log(req.headers.token);
    const token = req.headers.token.split(' ')[1]

    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(404).json({
                status: "ERR",
                message: "authentication error"
            })
        }

        if (user?.isAdmin) {
            next()
        } else {
            return res.status(404).json({
                status: "ERR",
                message: "authentication error"
            })
        }
    })
}

const authUserMiddleware = (req, res, next) => {
    const token = req.headers.token.split(' ')[1]
    const userId = req.params.id;

    console.log(token);
    console.log(process.env.ACCESS_TOKEN);
}

module.exports = {
    authMiddleware,
    authUserMiddleware
}

// const token = req.headers.token.split(' ')[1]
//     const userId = req.params.id
