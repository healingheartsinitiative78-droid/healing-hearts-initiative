/* ============================================
   HEALING HEART INITIATIVE (HHI)
   Volunteer Page JavaScript
============================================ */

document.addEventListener("DOMContentLoaded", function () {

    // =========================================
    // 1. SELECT MOBILE MENU ELEMENTS
    // =========================================

    const menuBtn = document.getElementById("menuBtn");
    const menuClose = document.getElementById("menuClose");
    const mobileMenu = document.getElementById("mobileMenu");
    const menuOverlay = document.getElementById("menuOverlay");


    // =========================================
    // 2. OPEN MOBILE MENU
    // =========================================

    function openMobileMenu() {

        if (!mobileMenu || !menuOverlay) return;

        mobileMenu.classList.add("active");
        menuOverlay.classList.add("active");

        mobileMenu.setAttribute("aria-hidden", "false");

        if (menuBtn) {
            menuBtn.setAttribute("aria-expanded", "true");
            menuBtn.setAttribute("aria-label", "Close menu");
        }

        document.body.classList.add("menu-open");
    }


    // =========================================
    // 3. CLOSE MOBILE MENU
    // =========================================

    function closeMobileMenu() {

        if (!mobileMenu || !menuOverlay) return;

        mobileMenu.classList.remove("active");
        menuOverlay.classList.remove("active");

        mobileMenu.setAttribute("aria-hidden", "true");

        if (menuBtn) {
            menuBtn.setAttribute("aria-expanded", "false");
            menuBtn.setAttribute("aria-label", "Open menu");
        }

        document.body.classList.remove("menu-open");
    }


    // =========================================
    // 4. TOGGLE MENU BUTTON
    // =========================================

    if (menuBtn) {

        menuBtn.addEventListener("click", function () {

            const isOpen = mobileMenu &&
                mobileMenu.classList.contains("active");

            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }

        });

    }


    // =========================================
    // 5. CLOSE BUTTON INSIDE THE MENU
    // =========================================

    if (menuClose) {

        menuClose.addEventListener("click", function () {
            closeMobileMenu();
        });

    }


    // =========================================
    // 6. CLOSE WHEN CLICKING OUTSIDE THE MENU
    // =========================================

    if (menuOverlay) {

        menuOverlay.addEventListener("click", function () {
            closeMobileMenu();
        });

    }


    // =========================================
    // 7. CLOSE AFTER CLICKING A NAVIGATION LINK
    // =========================================

    if (mobileMenu) {

        const mobileLinks = mobileMenu.querySelectorAll("a");

        mobileLinks.forEach(function (link) {

            link.addEventListener("click", function () {
                closeMobileMenu();
            });

        });

    }


    // =========================================
    // 8. CLOSE WHEN PRESSING ESCAPE
    // =========================================

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            closeMobileMenu();
        }

    });


    // =========================================
    // 9. PREVENT BACKGROUND SCROLLING
    // =========================================

    window.addEventListener("resize", function () {

        if (window.innerWidth > 950) {
            closeMobileMenu();
        }

    });


    // =========================================
    // 10. AUTOMATIC COPYRIGHT YEAR
    // =========================================

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

});