const ProductService = require('../services/ProductServices')
const createProduct = async (req, res) => {
    const { name, image, type, price, countInStock } = req.body
    try {
        if (!name || !image || !type || !price || !countInStock) {
            return res.status(200).json({
                status: "ERR",
                message: "input is required"
            })
        }

        const response = await ProductService.createProduct(req.body)
        return res.status(200).json(response)
    }
    catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}


const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id
        const data = req.body

        if (!productId) {
            return res.status(200).json({
                statut: "ERR",
                message: "product id is required"
            })
        }
        const response = await ProductService.updateProduct(productId, data)
        return res.status(200).json(response)
    }
    catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const ProductId = req.params.id
        const token = req.headers

        if (!ProductId) {
            return res.status(200).json({
                statut: "ERR",
                message: "Product id is required"
            })
        }
        const response = await ProductService.deleteProduct(ProductId)
        return res.status(200).json(response)
    }
    catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const detailProduct = async (req, res) => {
    try {
        const ProductId = req.params.id

        if (!ProductId) {
            return res.status(200).json({
                statut: "ERR",
                message: "Product id is required"
            })
        }
        const response = await ProductService.detailProduct(ProductId)
        return res.status(200).json(response)
    }
    catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllProduct = async (req, res) => {
    {
        try {
            const { limit, page } = req.query
            const response = await ProductService.getAllProduct(Number(limit), Number(page))
            return res.status(200).json(response)
        }
        catch (e) {
            return res.status(404).json({
                message: e
            })
        }
    }

}

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProduct,
    detailProduct
}