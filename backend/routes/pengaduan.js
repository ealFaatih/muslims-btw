const express = require("express");
const router = express.Router();
const db = require("../db");
const verifyToken = require("../middleware/verifyToken");
const { body, validationResult } = require("express-validator");

router.get("/", verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM pengaduan ORDER BY created_at DESC",
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ pesan: "Terjadi kesalahan pada server" });
  }
});

router.post(
  "/",
  [
    body("email").isEmail().withMessage("Format email tidak valid"),
    body("isi_laporan")
      .trim()
      .notEmpty()
      .withMessage("Isi laporan wajib diisi"),
    body("no_wa")
      .optional({ checkFalsy: true })
      .isMobilePhone("id-ID")
      .withMessage("Nomor Whatsapp tidak valid"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ pesan: errors.array()[0].msg });
    }
    try {
      const { nama, email, no_wa, kategori_id, isi_laporan } = req.body;

      const [result] = await db.query(
        "INSERT INTO pengaduan (nama, email, no_wa, kategori_id, isi_laporan) VALUES (?, ?, ?, ?, ?)",
        [nama || null, email, no_wa || null, kategori_id || null, isi_laporan],
      );

      res.status(201).json({
        pesan: "Laporan berhasil dikirim, terima kasih!",
        id: result.insertId,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ pesan: "Terjadi kesalahan pada server" });
    }
  },
);

module.exports = router;
