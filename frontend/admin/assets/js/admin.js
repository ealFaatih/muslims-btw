const API_BASE = "http://localhost:3000/api";

const loginSection = document.getElementById("loginSection");
const dashboardSection = document.getElementById("dashboardSection");
const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");
const logoutBtn = document.getElementById("logoutBtn");

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

// Jalankan pengecekan begitu halaman dibuka
cekStatusLogin();
