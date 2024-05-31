const router = require('express').Router()
const { authenticateToken, isAdmin } = require("../../../utils/Auth/authentication")
const { createProduct,getProducts,updateProduct,deleteProduct } = require("../../../services/v1/ProductServices/controller")

router.post('/addproduct', authenticateToken, isAdmin, createProduct)
router.get('/getallproducts',  getProducts)
router.post('/updateproduct',  updateProduct)
router.post('/deleteproduct',  deleteProduct)

module.exports = router