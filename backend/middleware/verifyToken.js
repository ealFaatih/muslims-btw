const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ pesan: "Token tidak ditemukan, akses ditolak" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    return res
      .status(403)
      .json({ pesan: "Token tidak valid atau sudah kadaluarsa" });
  }
}

module.exports = verifyToken;
