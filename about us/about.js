/*==================================================
                ABOUT PAGE
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    initCounters();
    initLeaderCards();
    initAdvisoryModals();
    initTimelineAnimation();

});

/*==================================================
            ANIMATED COUNTERS
==================================================*/

function initCounters() {

    const counters = document.querySelectorAll(".counter");

    if (!counters.length) return;

    const observer = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;

            const target = parseInt(counter.dataset.target);

            let current = 0;

            const speed = target / 120;

            function updateCounter() {

                current += speed;

                if (current < target) {

                    counter.textContent = Math.ceil(current);

                    requestAnimationFrame(updateCounter);

                } else {

                    counter.textContent = target.toLocaleString();

                }

            }

            updateCounter();

            observer.unobserve(counter);

        });

    }, {

        threshold: .5

    });

    counters.forEach(counter => observer.observe(counter));

}

/*==================================================
        LEADERSHIP CARD EFFECT
==================================================*/

function initLeaderCards() {

    const cards = document.querySelectorAll(".leader-card");

    cards.forEach(card => {

        card.addEventListener("mousemove", e => {

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;

            const y = e.clientY - rect.top;

            const rotateY = (x / rect.width - .5) * 8;

            const rotateX = (.5 - y / rect.height) * 8;

            card.style.transform =
                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-8px)`;

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });

}

/*==================================================
        ADVISORY BOARD MODALS
==================================================*/

function initAdvisoryModals() {

    const openButtons = document.querySelectorAll("[data-modal]");
    const modals = document.querySelectorAll(".modal");

    if (!openButtons.length) return;

    openButtons.forEach(button => {

        button.addEventListener("click", () => {

            const modal = document.getElementById(button.dataset.modal);

            if (!modal) return;

            modal.classList.add("show");

            document.body.style.overflow = "hidden";

        });

    });

    modals.forEach(modal => {

        const close = modal.querySelector(".modal-close");

        if (close) {

            close.addEventListener("click", () => {

                modal.classList.remove("show");

                document.body.style.overflow = "";

            });

        }

        modal.addEventListener("click", e => {

            if (e.target === modal) {

                modal.classList.remove("show");

                document.body.style.overflow = "";

            }

        });

    });

}

/*==================================================
        TIMELINE ANIMATION
==================================================*/

function initTimelineAnimation() {

    const items = document.querySelectorAll(".timeline-item");

    if (!items.length) return;

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

            }

        });

    }, {

        threshold: .25

    });

    items.forEach(item => observer.observe(item));

}
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("show-menu");
        menuToggle.classList.toggle("active");

    });

}

if (navLinks) {

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("show-menu");
            menuToggle.classList.remove("active");

        });

    });

}
window.addEventListener("resize", () => {

    if (window.innerWidth > 991) {

        navLinks.classList.remove("show-menu");
        menuToggle.classList.remove("active");

    }

});
/*==================================================
                    MOBILE MENU
===================================================*/

function initMobileMenu() {

    const menuBtn =
        document.getElementById("mobileMenuBtn");

    const menu =
        document.getElementById("mobileMenu");

    const closeBtn =
        document.getElementById("mobileMenuClose");

    const overlay =
        document.getElementById("mobileMenuOverlay");


    if (!menuBtn || !menu) return;


    const icon =
        menuBtn.querySelector("i");


    /*----------------------------------------------
                    OPEN MENU
    ----------------------------------------------*/

    function openMenu() {

        menu.classList.add("active");

        if (overlay) {
            overlay.classList.add("active");
        }


        menuBtn.setAttribute(
            "aria-expanded",
            "true"
        );

        menuBtn.setAttribute(
            "aria-label",
            "Close menu"
        );

        menu.setAttribute(
            "aria-hidden",
            "false"
        );


        if (icon) {

            icon.classList.remove(
                "ri-menu-3-line"
            );

            icon.classList.add(
                "ri-close-line"
            );

        }


        document.body.style.overflow =
            "hidden";

    }


    /*----------------------------------------------
                    CLOSE MENU
    ----------------------------------------------*/

    function closeMenu() {

        menu.classList.remove("active");

        if (overlay) {
            overlay.classList.remove("active");
        }


        menuBtn.setAttribute(
            "aria-expanded",
            "false"
        );

        menuBtn.setAttribute(
            "aria-label",
            "Open menu"
        );

        menu.setAttribute(
            "aria-hidden",
            "true"
        );


        if (icon) {

            icon.classList.remove(
                "ri-close-line"
            );

            icon.classList.add(
                "ri-menu-3-line"
            );

        }


        document.body.style.overflow = "";

    }


    /*----------------------------------------------
                    TOGGLE
    ----------------------------------------------*/

    menuBtn.addEventListener(
        "click",
        () => {

            if (
                menu.classList.contains("active")
            ) {

                closeMenu();

            } else {

                openMenu();

            }

        }
    );


    /*----------------------------------------------
                    CLOSE BUTTON
    ----------------------------------------------*/

    if (closeBtn) {

        closeBtn.addEventListener(
            "click",
            closeMenu
        );

    }


    /*----------------------------------------------
                    OVERLAY
    ----------------------------------------------*/

    if (overlay) {

        overlay.addEventListener(
            "click",
            closeMenu
        );

    }


    /*----------------------------------------------
                CLOSE AFTER LINK CLICK
    ----------------------------------------------*/

    menu
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                closeMenu
            );

        });


    /*----------------------------------------------
                    ESCAPE KEY
    ----------------------------------------------*/

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                closeMenu();

            }

        }
    );


    /*----------------------------------------------
                RESET ON DESKTOP
    ----------------------------------------------*/

    window.addEventListener(
        "resize",
        () => {

            if (window.innerWidth > 991) {

                closeMenu();

            }

        }
    );

}