CREATE DATABASE muslims_btw;
USE muslims_btw;
CREATE TABLE admin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE kegiatan (
    id INT AUTO_INCREMENT PRIMARY KEY,
    judul VARCHAR(150) NOT NULL,
    deskripsi TEXT,
    tanggal DATE NOT NULL,
    lokasi VARCHAR(150),
    kuota INT,
    status_pendaftaran VARCHAR(50) DEFAULT 'Dibuka',
    poster_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE dokumentasi (
    id INT AUTO_INCREMENT PRIMARY KEY,
    kegiatan_id INT,
    deskripsi TEXT,
    tanggal DATE,
    FOREIGN KEY (kegiatan_id) REFERENCES kegiatan(id)
);
CREATE TABLE galeri (
    id INT AUTO_INCREMENT PRIMARY KEY,
    dokumentasi_id INT,
    file_url VARCHAR(255) NOT NULL,
    caption VARCHAR(255),
    FOREIGN KEY (dokumentasi_id) REFERENCES dokumentasi(id)
);
CREATE TABLE testimoni (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    foto_url VARCHAR(255),
    kegiatan_id INT,
    komentar TEXT NOT NULL,
    status_tampil BOOLEAN DEFAULT 0,
    FOREIGN KEY (kegiatan_id) REFERENCES kegiatan(id)
);
CREATE TABLE faq (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pertanyaan VARCHAR(255) NOT NULL,
    jawaban TEXT NOT NULL
);
CREATE TABLE kategori_pengaduan (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(50) NOT NULL
);
CREATE TABLE pengaduan (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(100),
    email VARCHAR(100) NOT NULL,
    no_wa VARCHAR(20),
    kategori_id INT,
    isi_laporan TEXT NOT NULL,
    file_url VARCHAR(255),
    status VARCHAR(50) DEFAULT 'Baru',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (kategori_id) REFERENCES kategori_pengaduan(id)
);