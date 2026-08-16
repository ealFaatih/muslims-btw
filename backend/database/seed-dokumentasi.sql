USE muslims_btw;
SELECT id, judul FROM kegiatan;
SELECT id, judul FROM muslims_btw.kegiatan;
SELECT id FROM dokumentasi ORDER BY id DESC LIMIT 2;
SELECT * FROM dokumentasi;
SELECT * FROM galeri;

INSERT INTO dokumentasi (kegiatan_id, deskripsi, tanggal)
VALUES (2, 'Diskusi terbuka membahas pentingnya karakter dalam kehidupan sehari-hari, diikuti 40-an peserta.', '2026-07-14');

INSERT INTO galeri (dokumentasi_id, file_url, caption)
VALUES
(2, 'assets/img/placeholder-1.jpg', 'Sesi penyampaian materi'),
(2, 'assets/img/placeholder-2.jpg', 'Sesi tanya jawab');

SELECT * FROM dokumentasi;
SELECT * FROM galeri;