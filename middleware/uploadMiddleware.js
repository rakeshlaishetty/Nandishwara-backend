const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const util = require('util');
const { bucket } = require('../firebase/firebaseConfig');

const unlinkFile = util.promisify(fs.unlink);
const mkdir = util.promisify(fs.mkdir);

const ensureUploadsDirExists = async () => {
  const dir = path.join(__dirname, '..', 'uploads');
  if (!fs.existsSync(dir)) {
    await mkdir(dir);
  }
};

const storageConfig = multer.diskStorage({
  destination: async (req, file, cb) => {
    await ensureUploadsDirExists();
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storageConfig,
  limits: { fileSize: 5 * 1024 * 1024 } // Limit file size to 5MB
});

const uploadMiddleware = upload.array('images', 5);


module.exports = { uploadMiddleware };
