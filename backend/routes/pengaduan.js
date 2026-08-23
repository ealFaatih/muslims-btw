const express = require("express");
const router = express.Router();
const db = require("../db");
const verifyToken = require("../middleware/verifyToken");

router.get("/", verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM pengaduan ORDER BY created_at DESC",
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ pesan: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { nama, email, no_wa, kategori_id, isi_laporan } = req.body;

    if (!email || !isi_laporan) {
      return res
        .status(400)
        .json({ pesan: "Email dan isi laporan wajib diisi" });
    }

    const [result] = await db.query(
      "INSERT INTO pengaduan (nama, email, no_wa, kategori_id, isi_laporan) VALUES (?, ?, ?, ?, ?)",
      [nama || null, email, no_wa || null, kategori_id || null, isi_laporan],
    );

    res.status(201).json({
      pesan: "Laporan berhasil dikirim, terima kasih!",
      id: result.insertId,
    });
  } catch (error) {
    res.status(500).json({ pesan: error.message });
  }
});

module.exports = router;
