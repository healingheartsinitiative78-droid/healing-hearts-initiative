// ================================
// MOBILE MENU
// ================================

const menuButton = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const closeButton = document.getElementById("menuClose");
const overlay = document.getElementById("menuOverlay");


// Open menu
menuButton.onclick = function () {
    mobileMenu.classList.add("active");
    overlay.classList.add("active");
    document.body.classList.add("menu-open");
};


// Close menu
closeButton.onclick = function () {
    mobileMenu.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("menu-open");
};


// Close when clicking outside
overlay.onclick = function () {
    mobileMenu.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("menu-open");
};


// Close menu when clicking a link
const mobileLinks = document.querySelectorAll(".mobile-nav a");

mobileLinks.forEach(function (link) {

    link.onclick = function () {
        mobileMenu.classList.remove("active");
        overlay.classList.remove("active");
        document.body.classList.remove("menu-open");
    };

});


// ================================
// FOOTER YEAR
// ================================

document.getElementById("currentYear").textContent =
    new Date().getFullYear();