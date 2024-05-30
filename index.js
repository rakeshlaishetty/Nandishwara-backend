// Packages
const express = require('express');
const morgan = require('morgan')
const helmet = require('helmet')
// Modules
const connectDB = require('./mongodb/conn')
const requiredData = require("./mongodb/requiredData")
const Routes = require("./routes/v1/index");
const { errorResponse } = require('./utils/response');

// Connection For Mondgob ANd ALl COnfiguratiosn in One
connectDB()
requiredData()
// Setup App
const app = express()
app.use(express.json());
// Additional Packages For Development 
app.use(morgan('combined'))
app.use(helmet());

// APIs Starts
app.use("/api/v1",Routes)

// catch Errors handlers
app.use((err, req, res, next) => {
    errorResponse(res, 500, err)

})
// PORT  NUMBER 
const port = process.env.PORT || 8080
app.listen(port,()=> {
    console.log(`Server is running on port ${port}`)
})