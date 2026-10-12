// ================================
// MOBILE MENU
// ================================

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const menuClose = document.getElementById("menuClose");
const menuOverlay = document.getElementById("menuOverlay");


// OPEN MENU
menuBtn.addEventListener("click", function () {

    mobileMenu.classList.add("active");
    menuOverlay.classList.add("active");

});


// CLOSE MENU
menuClose.addEventListener("click", function () {

    mobileMenu.classList.remove("active");
    menuOverlay.classList.remove("active");

});


// CLOSE MENU WHEN CLICKING OUTSIDE
menuOverlay.addEventListener("click", function () {

    mobileMenu.classList.remove("active");
    menuOverlay.classList.remove("active");

});


// CLOSE MENU AFTER CLICKING A LINK

const links = document.querySelectorAll(".mobile-nav a");

links.forEach(function (link) {

    link.addEventListener("click", function () {

        mobileMenu.classList.remove("active");
        menuOverlay.classList.remove("active");

    });

});


// ================================
// CURRENT YEAR
// ================================

const year = document.getElementById("currentYear");

if (year) {

    year.textContent = new Date().getFullYear();

}