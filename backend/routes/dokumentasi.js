const express = require("express");
const router = express.Router();
const db = require("../db");
const verifyToken = require("../middleware/verifyToken");

router.get("/", async (req, res) => {
  try {
    const [daftarDokumentasi] = await db.query(`
      SELECT dokumentasi.id, dokumentasi.deskripsi, dokumentasi.tanggal,
             kegiatan.judul AS judul_kegiatan, kegiatan.lokasi
      FROM dokumentasi
      JOIN kegiatan ON dokumentasi.kegiatan_id = kegiatan.id
      ORDER BY dokumentasi.tanggal DESC
    `);

    const [semuaGaleri] = await db.query("SELECT * FROM galeri");

    const hasil = daftarDokumentasi.map((dok) => ({
      ...dok,
      galeri: semuaGaleri.filter((foto) => foto.dokumentasi_id === dok.id),
    }));

    res.json(hasil);
  } catch (error) {
    console.error(error);
    res.status(500).json({ pesan: "Terjadi kesalahan pada server" });
  }
});

router.post("/", verifyToken, async (req, res) => {
  try {
    const { kegiatan_id, deskripsi, tanggal, foto } = req.body;

    if (!kegiatan_id || !deskripsi || !tanggal || !foto || foto.length === 0) {
      return res
        .status(400)
        .json({ pesan: "Semua field wajib diisi, minimal 1 foto" });
    }

    const [resultDokumentasi] = await db.query(
      "INSERT INTO dokumentasi (kegiatan_id, deskripsi, tanggal) VALUES (?, ?, ?)",
      [kegiatan_id, deskripsi, tanggal],
    );

    const dokumentasiId = resultDokumentasi.insertId;

    const nilaiGaleri = foto.map((url) => [dokumentasiId, url, null]);
    await db.query(
      "INSERT INTO galeri (dokumentasi_id, file_url, caption) VALUES ?",
      [nilaiGaleri],
    );

    res
      .status(201)
      .json({ pesan: "Dokumentasi berhasil ditambahkan", id: dokumentasiId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ pesan: "Terjadi kesalahan pada server" });
  }
});

module.exports = router;
