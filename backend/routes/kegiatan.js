const express = require("express");
const router = express.Router();
const db = require("../db");
const verifyToken = require("../middleware/verifyToken");

router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM kegiatan ORDER BY tanggal ASC",
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ pesan: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM kegiatan WHERE id = ?", [
      req.params.id,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ pesan: "Kegiatan tidak ditemukan" });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ pesan: error.message });
  }
});

router.post("/", verifyToken, async (req, res) => {
  try {
    const {
      judul,
      deskripsi,
      tanggal,
      lokasi,
      kuota,
      status_pendaftaran,
      poster_url,
    } = req.body;
    const [result] = await db.query(
      "INSERT INTO kegiatan (judul, deskripsi, tanggal, lokasi, kuota, status_pendaftaran, poster_url) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        judul,
        deskripsi,
        tanggal,
        lokasi,
        kuota,
        status_pendaftaran,
        poster_url,
      ],
    );
    res
      .status(201)
      .json({ pesan: "Kegiatan berhasil ditambahkan", id: result.insertId });
  } catch (error) {
    res.status(500).json({ pesan: error.message });
  }
});

router.put("/:id", verifyToken, async (req, res) => {
  try {
    const {
      judul,
      deskripsi,
      tanggal,
      lokasi,
      kuota,
      status_pendaftaran,
      poster_url,
    } = req.body;
    await db.query(
      "UPDATE kegiatan SET judul=?, deskripsi=?, tanggal=?, lokasi=?, kuota=?, status_pendaftaran=?, poster_url=? WHERE id=?",
      [
        judul,
        deskripsi,
        tanggal,
        lokasi,
        kuota,
        status_pendaftaran,
        poster_url,
        req.params.id,
      ],
    );
    res.json({ pesan: "Kegiatan berhasil diperbarui" });
  } catch (error) {
    res.status(500).json({ pesan: error.message });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await db.query("DELETE FROM kegiatan WHERE id=?", [req.params.id]);
    res.json({ pesan: "Kegiatan berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ pesan: error.message });
  }
});

module.exports = router;
