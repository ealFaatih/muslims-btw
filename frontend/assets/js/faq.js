document.addEventListener("DOMContentLoaded", async function () {
  const container = document.querySelector(".faq__list");
  const API_URL = "http://localhost:3000/api/faq";

  try {
    const response = await fetch(API_URL);
    const daftarFaq = await response.json();

    if (daftarFaq.length === 0) {
      container.innerHTML = "<p>Belum ada pertanyaan yang tersedia.</p>";
      return;
    }

    container.innerHTML = daftarFaq
      .map(
        (item) => `
      <details class="faq__item">
        <summary>${item.pertanyaan}</summary>
        <p>${item.jawaban}</p>
      </details>
    `,
      )
      .join("");
  } catch (error) {
    container.innerHTML = "<p>Gagal memuat FAQ. Coba refresh halaman.</p>";
    console.error(error);
  }
});
