/* ============================================================
   TEAM PAGE JAVASCRIPT
   Healing Heart Initiative
   ============================================================ */


/* ============================================================
   1. DOM ELEMENTS
   ============================================================ */

const siteHeader = document.getElementById("siteHeader");

const menuBtn = document.getElementById("menuBtn");

const menuClose = document.getElementById("menuClose");

const mobileMenu = document.getElementById("mobileMenu");

const menuOverlay = document.getElementById("menuOverlay");

const backTop = document.getElementById("backTop");

const newsletterForm =
    document.getElementById("newsletterForm");

const newsletterEmail =
    document.getElementById("newsletterEmail");

const newsletterMessage =
    document.getElementById("newsletterMessage");

const currentYear =
    document.getElementById("currentYear");


/* ============================================================
   2. MOBILE MENU
   ============================================================ */


/*
    Open the mobile navigation menu
*/

function openMobileMenu() {

    if (!mobileMenu || !menuOverlay) {
        return;
    }

    mobileMenu.classList.add("active");

    menuOverlay.classList.add("active");


    /*
        Prevent the page from scrolling
        while the menu is open.
    */

    document.body.style.overflow = "hidden";


    /*
        Accessibility
    */

    mobileMenu.setAttribute(
        "aria-hidden",
        "false"
    );

    menuOverlay.setAttribute(
        "aria-hidden",
        "false"
    );

    if (menuBtn) {

        menuBtn.setAttribute(
            "aria-expanded",
            "true"
        );

    }

}


/*
    Close the mobile navigation menu
*/

function closeMobileMenu() {

    if (!mobileMenu || !menuOverlay) {
        return;
    }

    mobileMenu.classList.remove("active");

    menuOverlay.classList.remove("active");


    /*
        Allow normal page scrolling again.
    */

    document.body.style.overflow = "";


    /*
        Accessibility
    */

    mobileMenu.setAttribute(
        "aria-hidden",
        "true"
    );

    menuOverlay.setAttribute(
        "aria-hidden",
        "true"
    );

    if (menuBtn) {

        menuBtn.setAttribute(
            "aria-expanded",
            "false"
        );

    }

}


/*
    Open menu button
*/

if (menuBtn) {

    menuBtn.addEventListener(
        "click",
        openMobileMenu
    );

}


/*
    Close menu button
*/

if (menuClose) {

    menuClose.addEventListener(
        "click",
        closeMobileMenu
    );

}


/*
    Close menu when clicking
    the dark overlay.
*/

if (menuOverlay) {

    menuOverlay.addEventListener(
        "click",
        closeMobileMenu
    );

}


/* ============================================================
   3. CLOSE MOBILE MENU WHEN A LINK IS CLICKED
   ============================================================ */

const mobileLinks =
    document.querySelectorAll(
        ".mobile-nav a"
    );


mobileLinks.forEach(function (link) {

    link.addEventListener(
        "click",
        closeMobileMenu
    );

});


/* ============================================================
   4. CLOSE MENU WITH ESCAPE KEY
   ============================================================ */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            mobileMenu &&
            mobileMenu.classList.contains("active")
        ) {

            closeMobileMenu();

        }

    }
);


/* ============================================================
   5. STICKY HEADER
   ============================================================ */


/*
    Add the "scrolled" class to the header
    after the user scrolls down.
*/

function updateHeader() {

    if (!siteHeader) {
        return;
    }


    if (window.scrollY > 30) {

        siteHeader.classList.add(
            "scrolled"
        );

    } else {

        siteHeader.classList.remove(
            "scrolled"
        );

    }

}


/*
    Run when the page scrolls.
*/

window.addEventListener(
    "scroll",
    updateHeader,
    {
        passive: true
    }
);


/*
    Run once when the page loads.
*/

updateHeader();


/* ============================================================
   6. REVEAL ELEMENTS
   ============================================================ */


/*
    Select all elements that have
    the "reveal" class.
*/

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


/*
    If IntersectionObserver is available,
    reveal elements when they enter the screen.
*/

if (
    "IntersectionObserver" in window
) {

    const revealObserver =
        new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "show"
                            );


                            /*
                                Stop observing once
                                the element is visible.
                            */

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
        function (element) {

            revealObserver.observe(
                element
            );

        }
    );


} else {

    /*
        Fallback for older browsers.
    */

    revealElements.forEach(
        function (element) {

            element.classList.add(
                "show"
            );

        }
    );

}


/* ============================================================
   7. BACK TO TOP BUTTON
   ============================================================ */


/*
    Show or hide the back-to-top button
    depending on scroll position.
*/

function updateBackTop() {

    if (!backTop) {
        return;
    }


    if (window.scrollY > 500) {

        backTop.style.opacity = "1";

        backTop.style.visibility =
            "visible";

    } else {

        backTop.style.opacity = "0";

        backTop.style.visibility =
            "hidden";

    }

}


window.addEventListener(
    "scroll",
    updateBackTop,
    {
        passive: true
    }
);


/*
    Scroll to the top when clicked.
*/

if (backTop) {

    backTop.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/*
    Run once on page load.
*/

updateBackTop();


/* ============================================================
   8. CURRENT YEAR
   ============================================================ */

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* ============================================================
   9. NEWSLETTER FORM
   ============================================================ */


/*
    This currently provides front-end validation only.

    It does NOT send an email to a real mailing system.

    Later we can connect this form to:
    - a backend
    - Formspree
    - Mailchimp
    - Brevo
    - another email service
*/

if (newsletterForm) {

    newsletterForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            /*
                Get and clean the email.
            */

            const email =
                newsletterEmail.value.trim();


            /*
                Basic email validation.
            */

            if (!email) {

                showNewsletterMessage(
                    "Please enter your email address.",
                    "error"
                );

                return;

            }


            /*
                Simple email pattern.
            */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (
                !emailPattern.test(email)
            ) {

                showNewsletterMessage(
                    "Please enter a valid email address.",
                    "error"
                );

                return;

            }


            /*
                Temporary success message.
            */

            showNewsletterMessage(
                "Thank you for subscribing!",
                "success"
            );


            /*
                Clear the input.
            */

            newsletterForm.reset();

        }
    );

}


/* ============================================================
   10. NEWSLETTER MESSAGE HELPER
   ============================================================ */

function showNewsletterMessage(
    message,
    type
) {

    if (!newsletterMessage) {
        return;
    }


    newsletterMessage.textContent =
        message;


    /*
        Use the existing site colors
        rather than adding complicated styling.
    */

    if (type === "success") {

        newsletterMessage.style.color =
            "#9fe3b5";

    } else {

        newsletterMessage.style.color =
            "#ffb3a7";

    }

}


/* ============================================================
   11. SMOOTH SCROLL FOR INTERNAL LINKS
   ============================================================ */


/*
    Handle links such as:

        #leadership
        #team-members

    while accounting for the fixed header.
*/

const internalLinks =
    document.querySelectorAll(
        'a[href^="#"]'
    );


internalLinks.forEach(
    function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const targetId =
                    this.getAttribute(
                        "href"
                    );


                /*
                    Ignore an empty "#".
                */

                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                /*
                    Fixed header height.
                */

                const headerHeight =
                    siteHeader
                        ? siteHeader.offsetHeight
                        : 0;


                const targetPosition =
                    target.getBoundingClientRect()
                        .top +
                    window.scrollY -
                    headerHeight -
                    15;


                window.scrollTo({

                    top: targetPosition,

                    behavior: "smooth"

                });

            }
        );

    }
);


/* ============================================================
   12. HANDLE WINDOW RESIZE
   ============================================================ */


/*
    If the user opens the mobile menu and then
    resizes the browser to desktop size,
    close the mobile menu.
*/

window.addEventListener(
    "resize",
    function () {

        if (
            window.innerWidth > 900 &&
            mobileMenu &&
            mobileMenu.classList.contains("active")
        ) {

            closeMobileMenu();

        }

    }
);


/* ============================================================
   13. INITIAL PAGE SETUP
   ============================================================ */


/*
    Make sure the mobile menu starts closed.
*/

if (mobileMenu) {

    mobileMenu.setAttribute(
        "aria-hidden",
        "true"
    );

}


if (menuOverlay) {

    menuOverlay.setAttribute(
        "aria-hidden",
        "true"
    );

}


/*
    Make sure the Team page is recognized
    as the current navigation page.
*/

const desktopLinks =
    document.querySelectorAll(
        ".desktop-nav a"
    );


desktopLinks.forEach(
    function (link) {

        const linkPath =
            link.getAttribute("href");


        /*
            The Team page already has
            class="active" in HTML.

            We keep this logic simple rather
            than dynamically guessing paths.
        */

        if (
            linkPath === "team.html"
        ) {

            link.classList.add(
                "active"
            );

        }

    }
);


/* ============================================================
   TEAM PAGE JAVASCRIPT COMPLETE
   ============================================================ */