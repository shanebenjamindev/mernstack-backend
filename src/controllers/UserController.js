const UserService = require('../services/UserServices')

const createUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, phone } = req.body
        const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        const isCheckEmail = reg.test(email)

        if (!name || !email || !password || !phone) {
            return res.status(200).json({
                status: "ERR",
                message: "input is required"
            })
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: "ERR",
                message: "check the email"
            })
        } else if (password !== confirmPassword) {
            return res.status(200).json({
                status: "ERR",
                message: "password is not the same"
            })
        }

        // console.log("isCheckEmail", isCheckEmail);
        const response = await UserService.createUser(req.body)
        return res.status(200).json(response)

    }
    catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, phone } = req.body
        const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        const isCheckEmail = reg.test(email)

        if (!name || !email || !password || !phone) {
            return res.status(200).json({
                status: "ERR",
                message: "input is required"
            })
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: "ERR",
                message: "check the email"
            })
        } else if (password !== confirmPassword) {
            return res.status(200).json({
                status: "ERR",
                message: "password is not the same"
            })
        }

        // console.log("isCheckEmail", isCheckEmail);
        const response = await UserService.loginUser(req.body)
        return res.status(200).json(response)

    }
    catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
module.exports = {
    createUser,
    loginUser
}