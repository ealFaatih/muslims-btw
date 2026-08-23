require("dotenv").config();
const bcrypt = require("bcrypt");
const db = require("../db");

async function buatAdmin() {
  const nama = "Al Faatih";
  const email = "admin@muslimsbtw.id";
  const passwordAsli = "MuslimsBtw3434*";

  const passwordHash = await bcrypt.hash(passwordAsli, 10);

  await db.query("INSERT INTO admin (nama, email, password) VALUES (?, ?, ?)", [
    nama,
    email,
    passwordHash,
  ]);

  console.log("Admin berhasil dibuat:", email);
  process.exit();
}

buatAdmin();
