// Packages
const express = require('express');
const morgan = require('morgan')
const helmet = require('helmet')
const cookieParser = require("cookie-parser")
const session = require('express-session');

// Modules
const connectDB = require('./mongodb/conn')
const Routes = require("./routes/v1/index");
const { errorResponse } = require('./utils/response');

// Connection For Mondgob ANd ALl COnfiguratiosn in One


connectDB()
// Setup App
const app = express()


app.use(cookieParser())

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge:  30 * 24 * 60 * 60 * 1000 //30days
    }
}));

app.use(express.json());
// Additional Packages For Development 
app.use(morgan('combined'))
app.use(helmet());

// APIs Starts
app.use("/api/v1",Routes)

// catch Errors handlers
app.use((err, req, res, next) => {
    console.log(err,"CAme here")
    errorResponse(res, 500, err)

})
// PORT  NUMBER 
const port = process.env.PORT || 8080
app.listen(port,()=> {
    console.log(`Server is running on port ${port}`)
})