const router =  require('express').Router()

router.post('/register',(req,res)=> {
    throw new Error("Some text")
    // res.status(201).statusMessage("yes").json({message:"hello"})
})

module.exports = router