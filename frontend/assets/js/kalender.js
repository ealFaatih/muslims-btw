document.addEventListener("DOMContentLoaded", async function () {
  const calendarEl = document.getElementById("calendar");
  const API_URL = "http://localhost:3000/api/kegiatan";

  try {
    const response = await fetch(API_URL);
    const dataKegiatan = await response.json();

    const eventsFullCalendar = dataKegiatan.map((event) => ({
      title: event.judul,
      start: event.tanggal.split("T")[0],
      lokasi: event.lokasi,
      deskripsi: event.deskripsi,
    }));

    const calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: "dayGridMonth",
      locale: "id",
      height: "auto",
      events: eventsFullCalendar,
      eventColor: "#1B6B93",
      eventClick: function (info) {
        const e = info.event;
        alert(
          e.title +
            "\n" +
            "Tanggal: " +
            e.startStr +
            "\n" +
            "Lokasi: " +
            e.extendedProps.lokasi +
            "\n\n" +
            e.extendedProps.deskripsi,
        );
      },
    });

    calendar.render();
  } catch (error) {
    calendarEl.innerHTML =
      "<p>Gagal memuat data kalender. Coba refresh halaman.</p>";
    console.error(error);
  }
});
