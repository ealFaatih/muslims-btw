const API_URL = "http://localhost:3000/api/kegiatan";

async function tampilkanKegiatan() {
  const container = document.querySelector(".upcoming__grid");

  try {
    const response = await fetch(API_URL);
    const dataKegiatan = await response.json();

    if (dataKegiatan.length === 0) {
      container.innerHTML = "<p>Belum ada kegiatan mendatang saat ini.</p>";
      return;
    }

    container.innerHTML = dataKegiatan
      .map(
        (event) => `
      <article class="event-card">
        <div class="event-card__poster">
          <span class="event-card__badge event-card__badge--open">${event.status_pendaftaran}</span>
        </div>
        <div class="event-card__body">
          <h2 class="event-card__title">${event.judul}</h2>
          <p class="event-card__meta">
            <time datetime="${event.tanggal}">${formatTanggal(event.tanggal)}</time> · ${event.lokasi}
          </p>
          <p class="event-card__desc">${event.deskripsi}</p>
          <a href="kontak.html" class="btn btn--primary">Daftar Sekarang</a>
        </div>
      </article>
    `,
      )
      .join("");
  } catch (error) {
    container.innerHTML =
      "<p>Gagal memuat data kegiatan. Coba refresh halaman.</p>";
    console.error(error);
  }
}

function formatTanggal(tanggalISO) {
  const opsi = { day: "numeric", month: "long", year: "numeric" };
  return new Date(tanggalISO).toLocaleDateString("id-ID", opsi);
}

document.addEventListener("DOMContentLoaded", tampilkanKegiatan);
