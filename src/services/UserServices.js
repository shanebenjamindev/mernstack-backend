const User = require('../models/UserModal');
const bcrypt = require('bcrypt');
const { genneralAccessToken, genneralRefreshToken } = require('./jwtServices');

const createUser = async (newUser) => {
    const { name, email, password, confirmPassword, phone } = newUser;
    try {
        const checkUser = await User.findOne({ email });

        if (checkUser) {
            return {
                status: "FAIL",
                message: "Email already exists",
            };
        }

        const hash = bcrypt.hashSync(password, 10);

        const createdUser = await User.create({
            name,
            email,
            password: hash,
            confirmPassword,
            phone,
        });

        if (createdUser) {
            return {
                status: "OK",
                message: "User created successfully",
            };
        }
    } catch (error) {
        return {
            status: "ERROR",
            message: "Error creating user",
            error,
        };
    }
};

const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { email, password } = userLogin
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if (checkUser === null) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined'
                })
            }
            const comparePassword = bcrypt.compareSync(password, checkUser.password)

            if (!comparePassword) {
                resolve({
                    status: 'ERR',
                    message: 'The password or user is incorrect'
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
                status: 'OK',
                message: 'SUCCESS',
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

            console.log(data);

            if (data.password && data.confirmPassword) {
                data.password = bcrypt.hashSync(data.password, 10);
                data.confirmPassword = bcrypt.hashSync(data.confirmPassword, 10);
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