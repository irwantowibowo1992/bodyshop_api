const { Readable } = require('stream');
const { cloudinary } = require('../config');

const uploadFile = (buffer, folder) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: folder },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    const bufferStream = new Readable();
    bufferStream.push(buffer);
    bufferStream.push(null);
    bufferStream.pipe(uploadStream);
  });
};

const deleteFile = async (public_id) => {
  cloudinary.uploader.destroy(public_id, (error, result) => {
    console.log(error, result);
  });
};

module.exports = {
  uploadFile,
  deleteFile,
};
