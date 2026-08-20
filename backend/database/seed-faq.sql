USE muslims_btw;

INSERT INTO faq (pertanyaan, jawaban)
SELECT 'Bagaimana cara bergabung dengan Muslims Btw?', 'Cukup datang ke salah satu kegiatan kami, atau hubungi kami lewat WhatsApp untuk info lebih lanjut.'
WHERE NOT EXISTS (
    SELECT 1 FROM faq WHERE pertanyaan = 'Bagaimana cara bergabung dengan Muslim BTW?'
);

INSERT INTO faq (pertanyaan, jawaban)
SELECT 'Apakah ada biaya untuk bergabung?', 'Tidak ada biaya keanggotaan. Beberapa kegiatan tertentu mungkin memiliki biaya operasional yang diinfokan terpisah.'
WHERE NOT EXISTS (
    SELECT 1 FROM faq WHERE pertanyaan = 'Apakah ada biaya untuk bergabung?'
);

INSERT INTO faq (pertanyaan, jawaban)
SELECT 'Siapa saja yang boleh ikut kegiatan?', 'Semua orang boleh ikut, baik Muslim maupun bukan — Muslim BTW terbuka untuk siapa saja yang tertarik dengan self-development.'
WHERE NOT EXISTS (
    SELECT 1 FROM faq WHERE pertanyaan = 'Siapa saja yang boleh ikut kegiatan?'
);

INSERT INTO faq (pertanyaan, jawaban)
SELECT 'Bagaimana cara mengetahui jadwal kegiatan?', 'Cek halaman kegiatan di website ini, atau ikuti akun Instagram resmi kami untuk update terbaru.'
WHERE NOT EXISTS (
    SELECT 1 FROM faq WHERE pertanyaan = 'Bagaimana cara mengetahui jadwal kegiatan?'
);

SELECT * FROM faq;
DELETE FROM faq WHERE id = 5;

