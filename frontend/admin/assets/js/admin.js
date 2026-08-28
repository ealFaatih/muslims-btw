const API_BASE = "http://localhost:3000/api";

const loginSection = document.getElementById("loginSection");
const dashboardSection = document.getElementById("dashboardSection");
const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");
const logoutBtn = document.getElementById("logoutBtn");
const tabelPengaduan = document.getElementById("tabelPengaduan");

// Elemen kelola kegiatan
const modalKegiatan = document.getElementById("modalKegiatan");
const btnTambahKegiatan = document.getElementById("btnTambahKegiatan");
const btnBatalKegiatan = document.getElementById("btnBatalKegiatan");
const formKegiatan = document.getElementById("formKegiatan");
const tabelKegiatan = document.getElementById("tabelKegiatan");

// Elemen kelola dokumentasi
const modalDokumentasi = document.getElementById("modalDokumentasi");
const btnTambahDokumentasi = document.getElementById("btnTambahDokumentasi");
const btnBatalDokumentasi = document.getElementById("btnBatalDokumentasi");
const formDokumentasi = document.getElementById("formDokumentasi");
const selectKegiatan = document.getElementById("dKegiatan");
const tabelDokumentasi = document.getElementById("tabelDokumentasi");
const uploadStatus = document.getElementById("uploadStatus");
const btnSimpanDokumentasi = document.getElementById("btnSimpanDokumentasi");

// Cek status login saat halaman dibuka
function cekStatusLogin() {
  const token = localStorage.getItem("adminToken");
  if (token) {
    tampilkanDashboard();
  } else {
    tampilkanLogin();
  }
}

function tampilkanDashboard() {
  loginSection.hidden = true;
  dashboardSection.hidden = false;
  muatDaftarKegiatan();
  muatDaftarPengaduan();
}

function tampilkanLogin() {
  loginSection.hidden = false;
  dashboardSection.hidden = true;
}

// Proses login
loginForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  loginError.textContent = "";

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const hasil = await response.json();

    if (!response.ok) {
      loginError.textContent = hasil.pesan;
      return;
    }

    localStorage.setItem("adminToken", hasil.token);
    tampilkanDashboard();
  } catch (error) {
    loginError.textContent = "Gagal terhubung ke server. Coba lagi nanti.";
    console.error(error);
  }
});

// Logout
logoutBtn.addEventListener("click", function () {
  localStorage.removeItem("adminToken");
  tampilkanLogin();
});

// Buka / Tutup modal kegiatan
btnTambahKegiatan.addEventListener("click", () => {
  modalKegiatan.classList.add("is-open");
  formKegiatan.reset();
});

btnBatalKegiatan.addEventListener("click", () => {
  modalKegiatan.classList.remove("is-open");
  formKegiatan.reset();
});

// Ambil & Tampilkan daftar kegiatan
async function muatDaftarKegiatan() {
  try {
    const response = await fetch(`${API_BASE}/kegiatan`);
    const daftarKegiatan = await response.json();

    if (daftarKegiatan.length === 0) {
      tabelKegiatan.innerHTML =
        '<tr><td colspan="5">Belum ada kegiatan.</td></tr>';
      return;
    }

    tabelKegiatan.innerHTML = daftarKegiatan
      .map(
        (k) => `
      <tr>
        <td>${k.judul}</td>
        <td>${new Date(k.tanggal).toLocaleDateString("id-ID")}</td>
        <td>${k.lokasi}</td>
        <td>${k.status_pendaftaran}</td>
        <td><button class="btn--hapus" data-id="${k.id}">Hapus</button></td>
      </tr>
    `,
      )
      .join("");
  } catch (error) {
    tabelKegiatan.innerHTML =
      '<tr><td colspan="5">Gagal memuat data.</td></tr>';
    console.error(error);
  }
}

// Ambil & Tampilkan daftar pengaduan
async function muatDaftarKegiatan() {
  const token = localStorage.getItem("adminToken");

  try {
    const response = await fetch(`${API_BASE}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      tabelPengaduan.innerHTML =
        '<tr><td colspan="5">Belum ada laporan masuk.</td></tr>';
      return;
    }

    tabelPengaduan.innerHTML = daftarPengaduan
      .map((p) => {
        const statusClass =
          p.status === "Selesai"
            ? "status-badge--selesai"
            : "status-badge--baru";
        const namaTampil = p.nama || "(Tanpa nama)";
        const kontak = p.no_wa ? `${p.email}<br>${p.no_wa}` : p.email;

        return `
      <tr>
      <td>${new Date(p.created_at).toLocaleDateString("id-ID")}</td>
      <td>${namaTampil}</td>
      <td>${kontak}</td>
      <td>${p.isi_laporan}</td>
      <td><span class="status-badge ${statusClass}">${p.status}</span></td>
      </tr>
      `;
      })
      .join("");
  } catch (error) {
    tabelPengaduan.innerHTML =
      '<tr><td colspan="5">Terjadi kesalahan koneksi.</td></tr>';
    console.error(error);
  }
}

// Submit form tambah kegiatan
formKegiatan.addEventListener("submit", async function (e) {
  e.preventDefault();
  const token = localStorage.getItem("adminToken");

  const data = {
    judul: document.getElementById("fJudul").value,
    deskripsi: document.getElementById("fDeskripsi").value,
    tanggal: document.getElementById("fTanggal").value,
    lokasi: document.getElementById("fLokasi").value,
    kuota: document.getElementById("fKuota").value || null,
    status_pendaftaran: "Dibuka",
    poster_url: null,
  };

  try {
    const response = await fetch(`${API_BASE}/kegiatan`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const hasil = await response.json();
      alert("Gagal manambah kegiatan: " + hasil.pesan);
      return;
    }

    modalKegiatan.classList.remove("is-open");
    formKegiatan.reset();
    muatDaftarKegiatan();
  } catch (error) {
    alert("Terjadi kesalahan koneksi.");
    console.error(error);
  }
});

// Hapus kegiatan (Event Delegation)
tabelKegiatan.addEventListener("click", async function (e) {
  if (!e.target.classList.contains("btn--hapus")) return;

  const id = e.target.dataset.id;
  const konfirmasi = confirm("Yakin ingin menghapus kegiatan ini?");
  if (!konfirmasi) return;

  const token = localStorage.getItem("adminToken");

  try {
    const response = await fetch(`${API_BASE}/kegiatan/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      const hasil = await response.json();
      alert("Gagal menghapus: " + hasil.pesan);
    }

    muatDaftarKegiatan();
  } catch (error) {
    alert("Terjadi kesalahan koneksi.");
  }
});

// Isi laporan kegiatan
async function isiDropdownKegiatan() {
  try {
    const response = await fetch(`${API_BASE}/kegiatan`);
    const daftarKegiatan = await response.json();

    selectKegiatan.innerHTML =
      '<option value="">-- Pilih Kegiatan --</option>' +
      daftarKegiatan
        .map((k) => `<option value="${k.id}">${k.judul}</option>`)
        .join("");
  } catch (error) {
    console.error("Gagal memuat daftar kegiatan:", error);
  }
}

// Buka / Tutup modal dokumentasi
btnTambahDokumentasi.addEventListener("click", () => {
  isiDropdownKegiatan();
  modalDokumentasi.classList.add("is-open");
});

btnBatalDokumentasi.addEventListener("click", () => {
  modalDokumentasi.classList.remove("is-open");
  formDokumentasi.reset();
  uploadStatus.textContent = "";
});

formDokumentasi.addEventListener("submit", async function (e) {
  e.preventDefault();
  const token = localStorage.getItem("adminToken");
  const fileFoto = document.getElementById("dFoto").files;

  if (fileFoto.length === 0) {
    uploadStatus.textContent = "Pilih minimal 1 foto.";
    return;
  }

  btnSimpanDokumentasi.disabled = true;
  uploadStatus.textContent = `Mengupload ${fileFoto.length} foto, mohon tunggu...`;

  try {
    // Tahap 1 - Upload semua foto ke Cloudinary
    const urlFotoSemua = [];
    for (const file of fileFoto) {
      const formData = new formData();
      formData.append("foto", file);

      const resUpload = await fetch(`${API_BASE}/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const hasilUpload = await resUpload.json();
      if (!resUpload.ok) throw new Error(hasilUpload.pesan);

      urlFotoSemua.push(hasilUpload.url);
    }

    // Tahap 2 - Simpan dokumentasi + Galeri ke database
    uploadStatus.textContent = "Menyimpan dokumentasi...";

    const dataDokumentasi = {
      kegiatan_id: selectKegiatan.value,
      deskripsi: document.getElementById("dDeskripsi").value,
      tanggal: document.getElementById("dTanggal").value,
      foto: urlFotoSemua,
    };

    const resSimpan = await fetch(`${API_BASE}/dokumentasi`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataDokumentasi),
    });

    if (!resSimpan.ok) {
      const hasil = await resSimpan.json();
      throw new Error(hasil.pesan);
    }

    modalDokumentasi.classList.remove("is-open");
    formDokumentasi.reset();
    uploadStatus.textContent = "";
    muatDaftarDokumentasi();
  } catch (error) {
    uploadStatus.textContent = "Gagal: " + error.message;
    console.error(error);
  } finally {
    btnSimpanDokumentasi.disabled = false;
  }
});

// Jalankan pengecekan begitu halaman dibuka
cekStatusLogin();
