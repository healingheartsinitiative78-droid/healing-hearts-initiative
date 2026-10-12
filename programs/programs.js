
/* ============================================================
   HEALING HEART INITIATIVE (HHI)
   PROGRAMS PAGE — JAVASCRIPT
   ============================================================

   This file controls the interactive behavior of the
   Programs page.

   Main features:
   1. Mobile navigation menu
   2. Sticky header
   3. Smooth scrolling
   4. Scroll reveal effects
   5. Program cards from HHI backend
   6. Program details buttons
   7. Back-to-top button
   8. Newsletter form
   9. Keyboard accessibility

   ============================================================ */


/* ============================================================
   1. WAIT FOR THE HTML DOCUMENT TO LOAD
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {


    /* ========================================================
       2. GET IMPORTANT HTML ELEMENTS
       ======================================================== */

    const header =
        document.getElementById("siteHeader");

    const menuBtn =
        document.getElementById("menuBtn");

    const menu =
        document.getElementById("mobileMenu");

    const menuClose =
        document.getElementById("menuClose");

    const overlay =
        document.getElementById("menuOverlay");

    const backTop =
        document.getElementById("backTop");


    /* ========================================================
       3. MOBILE MENU
       ======================================================== */


    /* --------------------------------------------------------
       3.1 OPEN MOBILE MENU
       -------------------------------------------------------- */

    function openMenu() {

        if (!menu) return;

        menu.classList.add("active");

        overlay?.classList.add("active");

        document.body.classList.add("menu-open");

        menu.setAttribute(
            "aria-hidden",
            "false"
        );

        menuBtn?.setAttribute(
            "aria-expanded",
            "true"
        );

        menuBtn?.setAttribute(
            "aria-label",
            "Close menu"
        );

        const icon =
            menuBtn?.querySelector("i");

        icon?.classList.remove(
            "ri-menu-3-line"
        );

        icon?.classList.add(
            "ri-close-line"
        );
    }


    /* --------------------------------------------------------
       3.2 CLOSE MOBILE MENU
       -------------------------------------------------------- */

    function closeMenu() {

        if (!menu) return;

        menu.classList.remove("active");

        overlay?.classList.remove("active");

        document.body.classList.remove("menu-open");

        menu.setAttribute(
            "aria-hidden",
            "true"
        );

        menuBtn?.setAttribute(
            "aria-expanded",
            "false"
        );

        menuBtn?.setAttribute(
            "aria-label",
            "Open menu"
        );

        const icon =
            menuBtn?.querySelector("i");

        icon?.classList.remove(
            "ri-close-line"
        );

        icon?.classList.add(
            "ri-menu-3-line"
        );
    }


    /* --------------------------------------------------------
       3.3 MENU BUTTON
       -------------------------------------------------------- */

    menuBtn?.addEventListener(
        "click",
        () => {

            if (
                menu?.classList.contains("active")
            ) {

                closeMenu();

            } else {

                openMenu();

            }

        }
    );


    /* --------------------------------------------------------
       3.4 CLOSE BUTTON
       -------------------------------------------------------- */

    menuClose?.addEventListener(
        "click",
        closeMenu
    );


    /* --------------------------------------------------------
       3.5 CLICK OUTSIDE MENU
       -------------------------------------------------------- */

    overlay?.addEventListener(
        "click",
        closeMenu
    );


    /* --------------------------------------------------------
       3.6 CLOSE MENU AFTER NAVIGATION
       -------------------------------------------------------- */

    document
        .querySelectorAll(".mobile-nav a")
        .forEach(link => {

            link.addEventListener(
                "click",
                closeMenu
            );

        });


    /* --------------------------------------------------------
       3.7 ESCAPE KEY
       -------------------------------------------------------- */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                closeMenu();

            }

        }
    );


    /* --------------------------------------------------------
       3.8 CLOSE MENU WHEN SCREEN BECOMES DESKTOP
       -------------------------------------------------------- */

    window.addEventListener(
        "resize",
        () => {

            if (window.innerWidth > 900) {

                closeMenu();

            }

        }
    );


    /* ========================================================
       4. STICKY HEADER
       ======================================================== */

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 30) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }


    updateHeader();


    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
    );


    /* ========================================================
       5. SMOOTH INTERNAL LINKS
       ======================================================== */

    function enableSmoothLinks() {

        document
            .querySelectorAll('a[href^="#"]')
            .forEach(link => {

                /*
                 * Avoid attaching the same listener more than once.
                 */

                if (
                    link.dataset.smoothReady === "true"
                ) {
                    return;
                }

                link.dataset.smoothReady = "true";


                link.addEventListener(
                    "click",
                    event => {

                        const selector =
                            link.getAttribute("href");


                        if (
                            !selector ||
                            selector === "#"
                        ) {

                            event.preventDefault();

                            return;
                        }


                        let target;

                        try {

                            target =
                                document.querySelector(
                                    selector
                                );

                        } catch {

                            return;

                        }


                        if (!target) return;


                        event.preventDefault();


                        target.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });


                        history.replaceState(
                            null,
                            "",
                            selector
                        );

                    }
                );

            });

    }


    enableSmoothLinks();


    /* ========================================================
       6. SCROLL REVEAL
       ======================================================== */

    function initializeReveal() {

        const revealElements =
            document.querySelectorAll(".reveal");


        if (
            "IntersectionObserver" in window
        ) {

            const observer =
                new IntersectionObserver(

                    entries => {

                        entries.forEach(
                            entry => {

                                if (
                                    entry.isIntersecting
                                ) {

                                    entry.target
                                        .classList
                                        .add("show");

                                    observer.unobserve(
                                        entry.target
                                    );

                                }

                            }
                        );

                    },

                    {
                        threshold: 0.12
                    }

                );


            revealElements.forEach(
                element => {

                    observer.observe(
                        element
                    );

                }
            );

        } else {

            revealElements.forEach(
                element => {

                    element.classList.add(
                        "show"
                    );

                }
            );

        }

    }


    initializeReveal();


    /* ========================================================
       7. LOAD PROGRAMS FROM HHI BACKEND
       ======================================================== */

    async function loadPublicPrograms() {

        const programGrid =
            document.querySelector(
                ".program-grid"
            );


        /*
         * Make sure the Programs grid exists.
         */

        if (!programGrid) {

            console.warn(
                "Programs grid (.program-grid) was not found."
            );

            return;
        }


        try {

            console.log(
                "Loading programs from HHI backend..."
            );


            /* ------------------------------------------------
               REQUEST PROGRAMS
               ------------------------------------------------ */

            const response =
                await fetch(
                    "http://localhost:5000/api/public/programs"
                );


            const data =
                await response.json();


            console.log(
                "Programs API response:",
                data
            );


            /* ------------------------------------------------
               CHECK RESPONSE
               ------------------------------------------------ */

            if (
                !response.ok ||
                !data.success
            ) {

                console.error(
                    "Failed to load programs:",
                    data.message ||
                    "Unknown error"
                );

                return;
            }


            const programs =
                Array.isArray(data.programs)
                    ? data.programs
                    : [];


            console.log(
                `Found ${programs.length} program(s) in database.`
            );


            /* ------------------------------------------------
               IF NO PROGRAMS
               ------------------------------------------------ */

            if (programs.length === 0) {

                console.log(
                    "No active programs found in the database."
                );

                return;
            }


            /* =================================================
               REMOVE OLD HARD-CODED CARDS
               ================================================= */

            programGrid.innerHTML = "";


            /* =================================================
               CREATE DATABASE PROGRAM CARDS
               ================================================= */

            programs.forEach(
                (program, index) => {

                    const card =
                        document.createElement(
                            "article"
                        );


                    card.className =
                        "program-card reveal";


                    /* -----------------------------------------
                       IMAGE
                       ----------------------------------------- */

                    const image =
                        program.image
                            ? program.image
                            : "../images/BG 1.jpeg";


                    /* -----------------------------------------
                       ICON
                       ----------------------------------------- */

                    let icon =
                        "ri-heart-pulse-line";


                    const category =
                        (
                            program.category ||
                            ""
                        ).toLowerCase();


                    if (
                        category.includes("mental")
                    ) {

                        icon =
                            "ri-mental-health-line";

                    }

                    else if (
                        category.includes("youth")
                    ) {

                        icon =
                            "ri-group-line";

                    }

                    else if (
                        category.includes("education")
                    ) {

                        icon =
                            "ri-book-open-line";

                    }

                    else if (
                        category.includes("community")
                    ) {

                        icon =
                            "ri-community-line";

                    }

                    else if (
                        category.includes("health")
                    ) {

                        icon =
                            "ri-heart-pulse-line";

                    }

                    else if (
                        category.includes("gender")
                    ) {

                        icon =
                            "ri-user-heart-line";

                    }

                    else if (
                        category.includes("research")
                    ) {

                        icon =
                            "ri-search-eye-line";

                    }


                    /* -----------------------------------------
                       CREATE CARD HTML
                       ----------------------------------------- */

                    card.innerHTML = `

                        <div class="card-image">

                            <img
                                src="${image}"
                                alt="${program.name}"
                                loading="lazy"
                            >

                        </div>


                        <div class="card-content">

                            <div class="card-icon">

                                <i class="${icon}"></i>

                            </div>


                            <h3>
                                ${program.name}
                            </h3>


                            <p>
                                ${
                                    program.short_description ||
                                    "Learn more about this HHI program."
                                }
                            </p>


                            <button
                                type="button"
                                class="learn-more program-details-button"
                                data-program-id="${program.id}"
                            >

                                Learn More

                                <i class="ri-arrow-right-line"></i>

                            </button>

                        </div>

                    `;


                    /* -----------------------------------------
                       STAGGER ANIMATION
                       ----------------------------------------- */

                    card.style.transitionDelay =
                        `${Math.min(
                            index * 50,
                            250
                        )}ms`;


                    programGrid.appendChild(
                        card
                    );

                }
            );


            /* =================================================
               ACTIVATE REVEAL FOR NEW CARDS
               ================================================= */

            const newCards =
                programGrid.querySelectorAll(
                    ".program-card.reveal"
                );


            if (
                "IntersectionObserver" in window
            ) {

                const observer =
                    new IntersectionObserver(

                        entries => {

                            entries.forEach(
                                entry => {

                                    if (
                                        entry.isIntersecting
                                    ) {

                                        entry.target
                                            .classList
                                            .add("show");

                                        observer.unobserve(
                                            entry.target
                                        );

                                    }

                                }
                            );

                        },

                        {
                            threshold: 0.12
                        }

                    );


                newCards.forEach(
                    card => {

                        observer.observe(
                            card
                        );

                    }
                );

            } else {

                newCards.forEach(
                    card => {

                        card.classList.add(
                            "show"
                        );

                    }
                );

            }


            /* =================================================
               PROGRAM DETAILS BUTTONS
               ================================================= */

            programGrid
                .querySelectorAll(
                    ".program-details-button"
                )
                .forEach(
                    button => {

                        button.addEventListener(
                            "click",
                            () => {

                                const programId =
                                    button.dataset
                                        .programId;


                                const selectedProgram =
                                    programs.find(
                                        program =>
                                            String(
                                                program.id
                                            ) ===
                                            String(
                                                programId
                                            )
                                    );


                                if (
                                    !selectedProgram
                                ) {

                                    console.error(
                                        "Program not found:",
                                        programId
                                    );

                                    return;
                                }


                                console.log(
                                    "Selected program:",
                                    selectedProgram
                                );


                                console.log(
                                    "Full description:",
                                    selectedProgram.full_description
                                );


                                /*
                                 * Program details modal
                                 * will be added in the next step.
                                 */

                            }
                        );

                    }
                );


            /* =================================================
               ENABLE SMOOTH LINKS AGAIN
               ================================================= */

            enableSmoothLinks();


            /* =================================================
               SUCCESS MESSAGE
               ================================================= */

            console.log(
                `Successfully loaded ${programs.length} program(s).`
            );

        }


        catch (error) {

            console.error(
                "Error loading public programs:",
                error
            );

        }

    }


    /* ========================================================
       START PUBLIC PROGRAMS API
       ======================================================== */

    loadPublicPrograms();


    /* ========================================================
       8. BACK-TO-TOP BUTTON
       ======================================================== */

    function updateBackTop() {

        if (!backTop) return;


        if (window.scrollY > 500) {

            backTop.classList.add("show");

        } else {

            backTop.classList.remove("show");

        }

    }


    updateBackTop();


    window.addEventListener(
        "scroll",
        updateBackTop,
        {
            passive: true
        }
    );


    /* --------------------------------------------------------
       8.1 CLICK BACK-TO-TOP
       -------------------------------------------------------- */

    backTop?.addEventListener(
        "click",
        event => {

            event.preventDefault();


            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });


            history.replaceState(
                null,
                "",
                window.location.pathname
            );

        }
    );


    /* ========================================================
       9. NEWSLETTER FORM
       ======================================================== */

    const newsletterForm =
        document.getElementById(
            "newsletterForm"
        );


    const newsletterEmail =
        document.getElementById(
            "newsletterEmail"
        );


    const newsletterMessage =
        document.getElementById(
            "newsletterMessage"
        );


    /* --------------------------------------------------------
       9.1 HANDLE NEWSLETTER SUBMISSION
       -------------------------------------------------------- */

    newsletterForm?.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const email =
                newsletterEmail?.value.trim();


            if (!email) return;


            if (newsletterMessage) {

                newsletterMessage.textContent =
                    "Thank you for subscribing. We will keep you updated.";

            }


            newsletterForm.reset();

        }
    );


    /* ========================================================
       10. ACCESSIBILITY / REDUCED MOTION
       ========================================================

       The CSS can handle:

       @media (prefers-reduced-motion: reduce)

       to minimize animations for users who prefer
       reduced motion.

       ======================================================== */


    /* ========================================================
       END OF PROGRAMS PAGE JAVASCRIPT
       ======================================================== */

});

