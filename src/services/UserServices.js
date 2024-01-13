const User = require('../models/UserModal');
const bcrypt = require('bcrypt');
const { genneralAccessToken, genneralRefreshToken } = require('./jwtServices');

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
    console.log(loginUser);
    return new Promise(async (resolve, reject) => {
        const { email, password } = loginUser
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

            const access_token = await genneralAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })

            const refresh_token = await genneralRefreshToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })

            resolve({
                status: "OK",
                message: "success",
                data: checkUser,
                access_token,
                refresh_token
            })

        } catch (e) {
            reject(e)
        }
    })
}
const updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id
            })

            if (checkUser === null) {
                resolve({
                    status: "OK",
                    message: "User is not defined"
                })
            }

            const updatedUser = await User.findByIdAndUpdate({ _id: id }, data, { new: true })

            resolve({
                status: "OK",
                message: "success",
                data: updatedUser
            })

        } catch (e) {
            reject(e)
        }
    })
}

const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id
            })

            if (checkUser === null) {
                resolve({
                    status: "OK",
                    message: "User is not defined"
                })
            }

            const deletedUser = await User.findByIdAndDelete(id)

            resolve({
                status: "OK",
                message: "success"
            })

        } catch (e) {
            reject(e)
        }
    })
}
const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {

            const allUser = await User.find()

            resolve({
                status: "OK",
                message: "success get",
                data: allUser
            })

        } catch (e) {
            reject(e)
        }
    })
}


const detailUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                _id: id
            })

            if (user === null) {
                resolve({
                    status: "OK",
                    message: "User is not defined"
                })
            }

            resolve({
                status: "OK",
                message: "success",
                data: user
            })

        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    detailUser
}