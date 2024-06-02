// uploadToFirebase.js

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { bucket } = require('./firebaseConfig');

const resizeAndUpload = (filePath) => {
  return new Promise((resolve, reject) => {
    const fileName = path.basename(filePath);
    const resizedPath = `uploads/resized-${fileName}`;

    sharp(filePath)
      .resize({ width: 480, height: 480, fit: sharp.fit.contain })
      .webp({ quality: 70 })
      .toFile(resizedPath, (err) => {
        if (err) {
          return reject(err);
        }

        const blob = bucket.file(fileName);
        const blobStream = blob.createWriteStream({
          metadata: {
            contentType: 'image/jpeg'
          }
        });

        blobStream.on('error', (err) => {
          reject(err);
        });

        blobStream.on('finish', async () => {
          const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
          resolve(publicUrl);

          // Cleanup: remove the resized image from the local filesystem
          fs.unlink(resizedPath, (err) => {
            if (err) console.error(`Failed to delete local file: ${resizedPath}`, err);
          });
        });

        fs.createReadStream(resizedPath).pipe(blobStream);
      });
  });
};

const uploadToFirebase = async (files) => {
  const urls = await resizeAndUpload(files.path);
  return urls;
};

module.exports = uploadToFirebase;
