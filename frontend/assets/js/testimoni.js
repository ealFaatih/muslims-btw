document.addEventListener("DOMContentLoaded", async function () {
  const container = document.querySelector(".testimoni__grid");
  const API_URL = "http://localhost:3000/api/testimoni";

  try {
    const response = await fetch(API_URL);
    const daftarTestimoni = await response.json();

    if (daftarTestimoni.length === 0) {
      container.innerHTML = "<p>Belum ada testimoni saat ini.</p>";
      return;
    }

    container.innerHTML = daftarTestimoni
      .map(
        (testi) => `
    <blockquote class="testi-card">
    <p>${testi.komentar}</p>
    <footer class="testi-card__author">
    - ${testi.nama}
    </footer>
    </blockquote>
    `,
      )
      .join("");
  } catch (error) {
    container.innerHTML =
      "<p>Gagal memuat testimoni. Coba refresh halaman.</p>";
    console.error(error);
  }
});
