const Product = require('../models/ProductModal');

const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const { name, image, type, price, countInStock, rating, description } = newProduct
        try {

            const checkProduct = await Product.findOne({
                name: name
            })

            if (checkProduct !== null) {
                resolve({
                    status: "OK",
                    message: "product exit"
                })
            }

            const createdProduct = await Product.create({
                name, image, type, price, countInStock, rating, description
            })

            if (createdProduct) {
                resolve({
                    status: "OK",
                    message: "success added product",
                    data: createdProduct
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}

const updateProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id
            })

            if (checkProduct === null) {
                resolve({
                    status: "OK",
                    message: "Product is not defined"
                })
            }

            const updatedProduct = await Product.findByIdAndUpdate({ _id: id }, data, { new: true })

            resolve({
                status: "OK",
                message: "success",
                data: updatedProduct
            })

        } catch (e) {
            reject(e)
        }
    })
}

const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id
            })

            if (checkProduct === null) {
                resolve({
                    status: "OK",
                    message: "Product is not defined"
                })
            }

            const deletedProduct = await Product.findByIdAndDelete(id)

            resolve({
                status: "OK",
                message: "success"
            })

        } catch (e) {
            reject(e)
        }
    })
}

const detailProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findOne({
                _id: id
            })

            if (product === null) {
                resolve({
                    status: "OK",
                    message: "Product is not defined"
                })
            }

            resolve({
                status: "OK",
                message: "success",
                data: product
            })

        } catch (e) {
            reject(e)
        }
    })
}


const getAllProduct = (limit, page) => {
    return new Promise(async (resolve, reject) => {
        try {
            const allProduct = await Product.find().limit(limit).skip(page * limit)
            const totalProduct = await Product.countDocuments()
            resolve({
                status: "OK",
                message: "success",
                data: allProduct,
                pageCurrent: page,
                totalProduct: totalProduct,
                totalPage: Math.ceil(totalProduct / limit)
            })

        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    detailProduct,
    getAllProduct
}