require("dotenv").config();
const express = require("express");
const db = require("./db");
const kegiatanRoutes = require("./routes/kegiatan");
const cors = require("cors");
const dokumentasiRoutes = require("./routes/dokumentasi");
const testimoniRoutes = require("./routes/testimoni");
const faqRoutes = require("./routes/faq");
const pengaduanRoutes = require("./routes/pengaduan");
const authRoutes = require("./routes/auth");
const uploadRoutes = require("./routes/upload");
const rateLimit = require("express-rate-limit");

const app = express();
const PORT = process.env.PORT || 3000;
const limiterLogin = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 5,
  message: { pesan: "Terlalu banyak percobaan login, coba lagi nanti." },
});

const limiterPengaduan = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 jam
  max: 10,
});

app.use(cors());
app.use(express.json());
app.use("/api/kegiatan", kegiatanRoutes);
app.use("/api/dokumentasi", dokumentasiRoutes);
app.use("/api/testimoni", testimoniRoutes);
app.use("/api/faq", faqRoutes);
app.use("/api/pengaduan", limiterPengaduan);
app.use("/api/pengaduan", pengaduanRoutes);
app.use("/api/auth/login", limiterLogin);
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/", (req, res) => {
  res.end("Server Muslims Btw backend jalan!");
});

app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await db.query("SHOW TABLES");
    res.json({ status: "sukses", tabel: rows });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: "gagal", pesan: "Terjadi kesalahan pada server" });
  }
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
