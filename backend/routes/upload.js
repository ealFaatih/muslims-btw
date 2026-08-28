const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../config/cloudinary");
const verifyToken = require("../middleware/verifyToken");

const upload = multer({ storage });

router.post("/", verifyToken, upload.single("foto"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ pesan: "Tidak ada file yang diupload" });
  }

  res.json({
    pesan: "Upload berhasil",
    url: req.file.path,
  });
});

module.exports = router;
