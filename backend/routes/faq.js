const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM faq ORDER BY id ASC");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ pesan: error.message });
  }
});

module.exports = router;
