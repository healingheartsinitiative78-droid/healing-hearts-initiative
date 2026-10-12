/* =========================================
   MOBILE MENU
========================================= */

const menuBtn = document.getElementById("menuBtn");
const menuClose = document.getElementById("menuClose");
const mobileMenu = document.getElementById("mobileMenu");
const menuOverlay = document.getElementById("menuOverlay");


function openMenu() {

    if (mobileMenu) {
        mobileMenu.classList.add("active");
    }

    if (menuOverlay) {
        menuOverlay.classList.add("active");
    }

    document.body.style.overflow = "hidden";
}


function closeMenu() {

    if (mobileMenu) {
        mobileMenu.classList.remove("active");
    }

    if (menuOverlay) {
        menuOverlay.classList.remove("active");
    }

    document.body.style.overflow = "";
}


/* OPEN */

if (menuBtn) {

    menuBtn.addEventListener("click", openMenu);

}


/* CLOSE */

if (menuClose) {

    menuClose.addEventListener("click", closeMenu);

}


/* CLOSE BY CLICKING OUTSIDE */

if (menuOverlay) {

    menuOverlay.addEventListener("click", closeMenu);

}


/* =========================================
   CLOSE AFTER CLICKING MOBILE LINK
========================================= */

const mobileLinks =
    document.querySelectorAll(".mobile-nav a");

mobileLinks.forEach(function(link) {

    link.addEventListener("click", closeMenu);

});


/* =========================================
   ESCAPE KEY
========================================= */

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        closeMenu();

    }

});


/* =========================================
   CURRENT YEAR
========================================= */

const currentYear =
    document.getElementById("currentYear");

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}