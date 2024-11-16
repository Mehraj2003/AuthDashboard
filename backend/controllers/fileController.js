const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../uploads");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath); // Create uploads directory if it doesn't exist
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Generate unique filename
  },
});

const upload = multer({ storage }).array("files", 10); // Handle up to 10 files

// Controller: Upload Files
const uploadFiles = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json({ success: false, message: "File upload failed", error: err });
    }

    const uploadedFiles = req.files.map((file) => ({
      name: file.originalname,
      url: `${req.protocol}://${req.get("host")}/uploads/${file.filename}`,
    }));

    res.status(200).json({ success: true, files: uploadedFiles });
  });
};

// Controller: Fetch Uploaded Files
const getFiles = (req, res) => {
  const uploadPath = path.join(__dirname, "../uploads");
  fs.readdir(uploadPath, (err, files) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Error reading files" });
    }

    const fileList = files.map((file) => ({
      name: file,
      url: `${req.protocol}://${req.get("host")}/uploads/${file}`,
    }));

    res.status(200).json({ success: true, files: fileList });
  });
};

module.exports = { uploadFiles, getFiles };
