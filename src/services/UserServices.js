const User = require('../models/UserModal');
const bcrypt = require('bcrypt');

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, confirmPassword, phone } = newUser
        try {

            const checkUser = await User.findOne({
                email: email
            })

            if (checkUser !== null) {
                resolve({
                    status: "OK",
                    message: "Email already exit"
                })
            }

            const hash = bcrypt.hashSync(password, 10)

            const createdUser = await User.create({
                name,
                email,
                password: hash,
                confirmPassword: hash,
                phone
            })

            if (createdUser) {
                resolve({
                    status: "OK",
                    message: "success added user"
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}

const loginUser = (loginUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, confirmPassword, phone } = loginUser
        try {

            const checkUser = await User.findOne({
                email: email
            })

            if (checkUser === null) {
                resolve({
                    status: "OK",
                    message: "User is not defined"
                })
            }

            const comparePassword = bcrypt.compareSync(password, checkUser.password)
            if (!comparePassword) {
                resolve({
                    status: "OK",
                    message: "Wrong password"
                })
            }
            resolve({
                status: "OK",
                message: "success",
                data: checkUser
            })

        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    createUser,
    loginUser
}