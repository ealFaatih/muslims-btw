document.addEventListener("DOMContentLoaded", async function () {
  const container = document.querySelector(".dok__list");
  const API_URL = "http://localhost:3000/api/dokumentasi";

  try {
    const response = await fetch(API_URL);
    const daftarDokumentasi = await response.json();

    if (daftarDokumentasi.length === 0) {
      container.innerHTML = "<p>Belum ada dokumentasi kegiatan saat ini.</p>";
      return;
    }

    container.innerHTML = daftarDokumentasi
      .map(
        (dok) => `
      <article class="dok-item">
        <div class="dok-item__header">
          <h2 class="dok-item__title">${dok.judul_kegiatan}</h2>
          <p class="dok-item__meta">
            <time datetime="${dok.tanggal}">${formatTanggal(dok.tanggal)}</time> · ${dok.lokasi}
          </p>
        </div>

        <p class="dok-item__desc">${dok.deskripsi}</p>

        <div class="dok-item__gallery">
          ${dok.galeri
            .map(
              (foto) => `
            <figure>
              <img src="${foto.file_url}" alt="${foto.caption}" />
              <figcaption>${foto.caption}</figcaption>
            </figure>
          `,
            )
            .join("")}
        </div>
      </article>
    `,
      )
      .join("");
  } catch (error) {
    container.innerHTML =
      "<p>Gagal memuat dokumentasi. Coba refresh halaman.</p>";
    console.error(error);
  }
});

function formatTanggal(tanggalISO) {
  const opsi = { day: "numeric", month: "long", year: "numeric" };
  return new Date(tanggalISO).toLocaleDateString("id-ID", opsi);
}
