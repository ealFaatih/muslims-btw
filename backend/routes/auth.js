const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await db.query("SELECT * FROM admin WHERE email = ?", [
      email,
    ]);
    if (rows.length === 0) {
      return res.status(401).json({ pesan: "Email atau password salah" });
    }

    const admin = rows[0];
    const cocok = await bcrypt.compare(password, admin.password);
    if (!cocok) {
      return res.status(401).json({ pesan: "Email atau password salah" });
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" },
    );

    res.json({ pesan: "Login berhasil", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ pesan: "Terjadi kesalahan pada server" });
  }
});

module.exports = router;
