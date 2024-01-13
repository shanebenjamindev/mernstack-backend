const productController = require('../controllers/ProductController')
const express = require('express')
const router = express.Router()

router.post('/create', productController.createProduct);
router.put('/update/:id', productController.updateProduct);
router.delete('/delete/:id', productController.deleteProduct);
// router.get('/getAllProduct', productController.getAllProduct);
router.get('/detail/:id', productController.detailProduct);

module.exports = router