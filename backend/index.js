require("dotenv").config();
const express = require("express");
const db = require("./db");
const kegiatanRoutes = require('./routes/kegiatan');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/kegiatan', kegiatanRoutes);

app.get("/", (req, res) => {
  res.end("Server Muslims Btw backend jalan!");
});

app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await db.query("SHOW TABLES");
    res.json({ status: "sukses", tabel: rows });
  } catch (error) {
    res.status(500).json({ status: "gagal", pesan: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
