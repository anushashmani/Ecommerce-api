const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const fs = require("fs");

const uploadFolder = "./src/uploads";
if (!fs.existsSync(uploadFolder)) {
  try {
    fs.mkdirSync(uploadFolder, { recursive: true });
    console.log("Uploads folder created successfully.");
  } catch (err) {
    console.error("Error creating uploads folder:", err);
    throw new Error("Unable to create uploads folder.");
  }
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    crypto.randomBytes(12, (err, bytes) => {
      if (err) return cb(err);
      const fn = bytes.toString("hex") + path.extname(file.originalname);
      cb(null, fn);
    });
  },
});

const upload = multer({ storage });

module.exports = { upload };
