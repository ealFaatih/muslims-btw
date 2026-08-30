const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM testimoni WHERE status_tampil = 1 ORDER BY id DESC",
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ pesan: "Terjadi kesalahan pada server" });
  }
});

module.exports = router;
