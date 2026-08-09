document.addEventListener("DOMContentLoaded", function () {
  const calendarEl = document.getElementById("calendar");

  const dataKegiatan = [
    {
      title: "Kajian Bulanan: Membangun Karakter",
      start: "2026-08-25",
      lokasi: "Masjid Al-Ikhlas, Semarang",
      deskripsi:
        "Diskusi terbuka seputar pengembangan karakter dalam perspektif Islam.",
    },
    {
      title: "Aksi Sosial: Berbagi untuk Sesama",
      start: "2026-09-06",
      lokasi: "Panti Asuhan Nurul Iman",
      deskripsi:
        "Kegiatan berbagi kebutuhan pokok bersama anak-anak panti asuhan.",
    },
  ];

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    locale: "id",
    height: "auto",
    events: dataKegiatan,
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
});
