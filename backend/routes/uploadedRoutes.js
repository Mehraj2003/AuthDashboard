const express = require("express");
const { uploadFiles, getFiles } = require("../controllers/fileController");

const router = express.Router();

// Route: Upload Files
router.post("/upload", uploadFiles);

// Route: Get Uploaded Files
router.get("/", getFiles);

module.exports = router;
