document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formAduan");
  const API_URL = "http://localhost:3000/api/pengaduan";

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const data = {
      nama: form.nama.value,
      email: form.email.value,
      no_wa: form.whatsapp.value,
      kategori_id: null,
      isi_laporan: form.isi.value,
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const hasil = await response.json();

      if (response.ok) {
        alert(hasil.pesan);
        form.reset();
      } else {
        alert("Gagal mengirim: " + hasil.pesan);
      }
    } catch (error) {
      alert("Terjadi kesalahan koneksi. Coba lagi nanti.");
      console.error(error);
    }
  });
});
