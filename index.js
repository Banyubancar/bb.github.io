document.addEventListener("DOMContentLoaded", function() {

    // ==========================================
    // 1. DARK / LIGHT THEME TOGGLE (Moon to Sun)
    // ==========================================
    const themeToggleBtn = document.getElementById("theme-toggle");
    const themeIcon = themeToggleBtn.querySelector("i");

    // Cek apakah user sebelumnya sudah punya preferensi tema yang tersimpan
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "light") {
        document.body.classList.add("light-theme");
        themeIcon.classList.replace("fa-moon", "fa-sun");
    }

    themeToggleBtn.addEventListener("click", () => {
        // Efek toggle class tema pada tag body
        document.body.classList.toggle("light-theme");

        // Pengkondisian pergantian ikon & simpan preferensi ke local storage
        if (document.body.classList.contains("light-theme")) {
            themeIcon.classList.replace("fa-moon", "fa-sun");
            localStorage.setItem("theme", "light");
        } else {
            themeIcon.classList.replace("fa-sun", "fa-moon");
            localStorage.setItem("theme", "dark");
        }
    });

    // ==========================================
    // 2. NAVBAR SCROLL EFFECT
    // ==========================================
    const navbar = document.querySelector(".navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // ==========================================
    // 3. MOBILE MENU HAMBURGER INTERACTION
    // ==========================================
    const menuToggle = document.getElementById("mobile-menu");
    const navLinks = document.querySelector(".nav-links");

    menuToggle.addEventListener("click", () => {
        menuToggle.classList.toggle("is-active");
        navLinks.classList.toggle("active");
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            menuToggle.classList.remove("is-active");
            navLinks.classList.remove("active");
        });
    });

    // ==========================================
    // 4. WHATSAPP BOOKING INTEGRATION
    // ==========================================
    const form = document.getElementById("travelBookingForm");

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const nama = document.getElementById("namaPemesan").value.trim();
        const noHP = document.getElementById("noWhatsApp").value.trim();
        const tanggalInput = document.getElementById("tanggal").value;
        const waktu = document.getElementById("pilihanWaktu").value;
        const jemput = document.getElementById("alamatPenjemputan").value.trim();
        const tujuan = document.getElementById("alamatTujuan").value.trim();
        const penumpang = document.getElementById("jumlahPenumpang").value.trim();

        // 📝 NOMOR WA ADMIN FIX 6282140490944
        const nomorAdmin = "6282140490944";

        const dateParts = tanggalInput.split("-");
        const tanggalFormatted = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;

        if (!nama || !noHP || !tanggalInput || !waktu || !jemput || !tujuan || !penumpang) {
            alert("Mohon lengkapi semua kolom pemesanan terlebih dahulu.");
            return;
        }

        // 🎯 FORMAT FIX: Jarak baris kosong (enter) persis seperti susunan format teks yang Anda inginkan
        const textMessage = `*Form Pemesanan Travel Banyubancar* _(Pengisiam form hanya untuk yang pesan, & mohon tidak merubah susunan format \u{1F64F})_

Tanggal : ${tanggalFormatted}
Waktu : ${waktu}

Nama : ${nama}
No HP : ${noHP}

Alamat Penjemputan : ${jemput}

Alamat Tujuan : ${tujuan}

Jumlah Penumpang : ${penumpang}`;

        const encodedMessage = encodeURIComponent(textMessage);
        const waUrl = `https://wa.me/${nomorAdmin}?text=${encodedMessage}`;

        window.open(waUrl, "_blank");
    });

    // ==========================================
    // 5. ANIMASI INTERSECTION OBSERVER (Scroll Reveal)
    // ==========================================
    const revealElements = document.querySelectorAll(".scroll-reveal");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    revealElements.forEach(element => {
        observer.observe(element);
    });

    // ==========================================
    // 6. ACTIVE NAV LINK ACCORDING TO SCROLL
    // ==========================================
    const sections = document.querySelectorAll("section");
    const navItems = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute("id");
            }
        });

        navItems.forEach(item => {
            item.classList.remove("active");
            if (item.getAttribute("href") === `#${current}`) {
                item.classList.add("active");
            }
        });
    });
});
