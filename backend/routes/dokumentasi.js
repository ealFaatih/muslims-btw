const express = require("express");
const router = express.Router();
const db = require("../db");

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
    res.status(500).json({ pesan: error.message });
  }
});

module.exports = router;
