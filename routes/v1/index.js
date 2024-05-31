const router = require('express').Router()
const userRoutes = require("./userRoutes/route")
const roleRoutes = require("./Roles/route")
const CategoryRoutes = require("./CategoryRoutes/routes")
const ProductRoutes = require("./ProductRoutes/route")
const AddressRoutes = require("./AddressRoutes/route")
const cartRoutes = require("./cartRoutes/route")



router.use("/user",userRoutes)
router.use("/roles",roleRoutes)
router.use("/category",CategoryRoutes)
router.use("/products",ProductRoutes)
router.use("/address",AddressRoutes)
router.use("/cart",cartRoutes)

module.exports = router