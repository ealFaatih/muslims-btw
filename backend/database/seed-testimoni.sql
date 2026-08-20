USE muslims_btw;

INSERT INTO testimoni (nama, komentar, kegiatan_id, status_tampil)
SELECT 'Ahmad Fauzan', 'Ikut Muslims Btw bikin saya lebih semangat belajar sambil dekat dengan iman. Lingkungannya suportif banget.', 2, 1
WHERE NOT EXISTS (
    SELECT 1 FROM testimoni WHERE nama = 'Ahmad Fauzan' AND komentar = 'Ikut Muslims Btw bikin saya lebih semangat belajar sambil dekat dengan iman. Lingkungannya suportif banget.'
);

INSERT INTO testimoni (nama, komentar, kegiatan_id, status_tampil)
SELECT 'Siti Nurhaliza', 'Awalnya cuma ikut-ikutan teman, eh malah jadi nemu circle yang positif dan saling support.', NULL, 1
WHERE NOT EXISTS (
    SELECT 1 FROM testimoni WHERE nama = 'Siti Nurhaliza' AND komentar = 'Awalnya cuma ikut-ikutan teman, eh malah jadi nemu circle yang positif dan saling support.'
);

SELECT * FROM testimoni;

DELETE FROM testimoni WHERE id = 3;