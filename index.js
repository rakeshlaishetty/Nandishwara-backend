const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { uploadMiddleware } = require('./middleware/uploadMiddleware');
const uploadToFirebase = require('./firebase/uploadToFirebase');
const fs = require('fs');
const cors = require("cors")
const util = require('util');
const mkdir = util.promisify(fs.mkdir);

const unlinkFile = util.promisify(fs.unlink);



const connectDB = require('./mongodb/conn');
const Routes = require('./routes/v1/index');
const { errorResponse } = require('./utils/response');

// Connection For MongoDB And All Configurations in One
connectDB();

// Setup App
const app = express();

app.use(cors({
    origin: 'http://localhost:3000', // or your frontend domain
    credentials: true,
}));


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: true, // Set to true if using HTTPS
        sameSite: 'Lax',
    }
}));


app.use(morgan('combined'));
app.use(helmet());

// app.post('/upload', uploadMiddleware, async (req, res) => {
//     try {
//         const files = req.files;
//         if (!files || files.length === 0) {
//             return res.status(400).json({ error: 'No files uploaded.' });
//         }

//         // const publicUrls = await uploadToFirebase(files);

//         const publicUrls = []
//         for (let file of files) {
//             const publicurl = await uploadToFirebase(file);
//             console.log(publicurl, "publicurl")
//             publicUrls.push(publicurl)
//             await deleteFileWithRetry(file.path)
//         }



//         // Delete local files after successful upload

//         res.status(200).json({ message: 'Files uploaded successfully', urls: publicUrls });
//     } catch (error) {
//         console.error('Error during file upload:', error);
//         res.status(500).json({ error: error.message });
//     }
// });

// APIs Starts
app.use('/api/v1', Routes);

// catch Errors handlers
app.use((err, req, res, next) => {
    console.error('CAme here', err);
    errorResponse(res, 500, err);
});

// PORT NUMBER
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
