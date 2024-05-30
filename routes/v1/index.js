const router = require('express').Router()
const userRoutes = require("./userRoutes/route")
const roleRoutes = require("./Roles/route")



router.use("/user",userRoutes)
router.use("/roles",roleRoutes)

module.exports = router