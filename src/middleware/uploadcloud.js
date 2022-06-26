const multer = require("multer");
require('dotenv').config()
const GridFsStorage = require('multer-gridfs-storage');

const Storage = new GridFsStorage({
  url: process.env.URL,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-any-name-${file.originalname}`;
      return filename;
    }
    return {
      bucketName: "docs",
      filename: `${Date.now()}-any-name-${file.originalname}`,
    };
  },
},
);

module.exports = multer({Storage})
