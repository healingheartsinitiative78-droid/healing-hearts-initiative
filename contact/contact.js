(function () {

/*==================================================
                    CONTACT PAGE
==================================================*/

/* Contact details (country code + number, no "+" or spaces) */
const WHATSAPP_NUMBER = "250783007675";
const CONTACT_EMAIL = "healingheartsinitiative78@gmail.com";

/* EmailJS (external service that sends the email for you).
   Get these 3 values from https://dashboard.emailjs.com */
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";


/* Run once the page is ready (works even if DOM is already loaded) */
function onReady(fn) {

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", fn);
    } else {
        fn();
    }

}

onReady(() => {

    initStickyHeader();
    initScrollReveal();
    initFAQ();
    initSmoothScroll();
    initContactForm();
    initMobileMenu();

});


/*=========================================
        STICKY HEADER
=========================================*/

function initStickyHeader() {

    const header =
        document.getElementById("siteHeader") ||
        document.getElementById("header");

    if (!header) return;

    function update() {

        header.classList.toggle("scrolled", window.scrollY > 80);

    }

    window.addEventListener("scroll", update, { passive: true });

    update();

}


/*=========================================
        SCROLL REVEAL
=========================================*/

function initScrollReveal() {

    const revealElements = document.querySelectorAll(".reveal");

    if (!revealElements.length) return;

    /* Old browsers: just show everything */
    if (!("IntersectionObserver" in window)) {

        revealElements.forEach(el => el.classList.add("active"));
        return;

    }

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

                observer.unobserve(entry.target);

            }

        });

    }, { threshold: 0.15 });

    revealElements.forEach(el => observer.observe(el));

}


/*=========================================
        FAQ ACCORDION
=========================================*/

function initFAQ() {

    const faqItems = document.querySelectorAll(".faq-item");

    if (!faqItems.length) return;

    faqItems.forEach(item => {

        const button = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");

        if (!button || !answer) return;

        button.setAttribute("type", "button");

        /* Initial height */
        answer.style.maxHeight =
            item.classList.contains("active")
                ? answer.scrollHeight + "px"
                : "0px";

        button.addEventListener("click", () => {

            const isOpen = item.classList.contains("active");

            /* Close every FAQ */
            faqItems.forEach(other => {

                const otherAnswer = other.querySelector(".faq-answer");

                other.classList.remove("active");

                if (otherAnswer) otherAnswer.style.maxHeight = "0px";

            });

            /* Open the selected one */
            if (!isOpen) {

                item.classList.add("active");

                answer.style.maxHeight = answer.scrollHeight + "px";

            }

        });

    });

    /* Recalculate open answer height when the screen size changes */
    window.addEventListener("resize", () => {

        const activeItem = document.querySelector(".faq-item.active");

        if (!activeItem) return;

        const activeAnswer = activeItem.querySelector(".faq-answer");

        if (activeAnswer) {
            activeAnswer.style.maxHeight = activeAnswer.scrollHeight + "px";
        }

    });

}


/*=========================================
        SMOOTH SCROLL
=========================================*/

function initSmoothScroll() {

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            const href = this.getAttribute("href");

            /* Ignore empty links like href="#" (they would cause an error) */
            if (!href || href === "#") {

                e.preventDefault();
                return;

            }

            const target = document.querySelector(href);

            if (target) {

                e.preventDefault();

                target.scrollIntoView({ behavior: "smooth" });

            }

        });

    });

}


/*=========================================
        CONTACT FORM (WhatsApp + Email)
=========================================*/

function initContactForm() {

    const form = document.getElementById("contactForm");

    if (!form) return;

    const sendButton = document.getElementById("send-button");
    const buttonText = document.getElementById("button-text");

    /* Use the page's status line, or create one if it is missing */
    let status = document.getElementById("form-status");

    if (!status) {

        status = document.createElement("p");
        status.id = "form-status";
        status.setAttribute("role", "status");
        status.setAttribute("aria-live", "polite");

        form.appendChild(status);

    }

    /* Is EmailJS loaded and configured? */
    const emailJsReady =
        typeof window.emailjs !== "undefined" &&
        EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY" &&
        EMAILJS_SERVICE_ID !== "YOUR_SERVICE_ID" &&
        EMAILJS_TEMPLATE_ID !== "YOUR_TEMPLATE_ID";

    if (emailJsReady) {

        window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

    }

    /* Read the form fields */
    function getData() {

        const value = fieldName =>
            form.elements[fieldName] ? form.elements[fieldName].value.trim() : "";

        return {
            from_name: value("from_name"),
            from_email: value("from_email"),
            phone: value("phone"),
            subject: value("subject"),
            message: value("message")
        };

    }

    function buildText(d) {

        return (
            "Name: " + d.from_name + "\n" +
            "Email: " + d.from_email + "\n" +
            (d.phone ? "Phone: " + d.phone + "\n" : "") +
            "Subject: " + d.subject + "\n\n" +
            d.message
        );

    }

    function whatsappUrl(d) {

        return "https://wa.me/" + WHATSAPP_NUMBER +
            "?text=" + encodeURIComponent("*" + d.subject + "*\n\n" + buildText(d));

    }

    function gmailUrl(d) {

        return "https://mail.google.com/mail/?view=cm&fs=1" +
            "&to=" + encodeURIComponent(CONTACT_EMAIL) +
            "&su=" + encodeURIComponent(d.subject) +
            "&body=" + encodeURIComponent(buildText(d));

    }

    function mailtoUrl(d) {

        return "mailto:" + CONTACT_EMAIL +
            "?subject=" + encodeURIComponent(d.subject) +
            "&body=" + encodeURIComponent(buildText(d));

    }

    /* A coloured link-button */
    function createLink(label, iconClass, color, href) {

        const link = document.createElement("a");

        link.href = href;
        link.target = "_blank";
        link.rel = "noopener noreferrer";

        link.innerHTML = '<i class="' + iconClass + '"></i> ' + label;

        link.style.cssText =
            "display:inline-flex;align-items:center;gap:8px;" +
            "padding:12px 20px;margin:8px 10px 0 0;border:none;" +
            "border-radius:8px;cursor:pointer;font:inherit;" +
            "font-weight:600;color:#fff;text-decoration:none;" +
            "background:" + color + ";";

        return link;

    }

    function setLoading(isLoading) {

        if (sendButton) sendButton.disabled = isLoading;

        if (buttonText) {
            buttonText.textContent = isLoading ? "Sending..." : "Send Message";
        }

    }

    /* Manual options (used if EmailJS is not set up or fails) */
    function showManualOptions(d, intro) {

        status.textContent = intro;

        status.appendChild(document.createElement("br"));

        status.appendChild(
            createLink("Send via WhatsApp", "ri-whatsapp-line", "#25D366", whatsappUrl(d))
        );

        status.appendChild(
            createLink("Send via Email (Gmail)", "ri-mail-send-line", "#EA4335", gmailUrl(d))
        );

        const fallback = document.createElement("div");

        fallback.style.cssText = "margin-top:10px;font-size:.85rem;";

        const mailLink = document.createElement("a");

        mailLink.href = mailtoUrl(d);
        mailLink.textContent = "or open my email app instead";

        fallback.appendChild(mailLink);

        status.appendChild(fallback);

    }

    /* Email was delivered by EmailJS; offer WhatsApp too */
    function showSuccess(d) {

        status.textContent =
            "Thank you! Your message has been sent by email. " +
            "We will contact you soon.";

        status.appendChild(document.createElement("br"));

        status.appendChild(
            createLink("Also chat with us on WhatsApp", "ri-whatsapp-line", "#25D366", whatsappUrl(d))
        );

    }

    form.addEventListener("submit", e => {

        e.preventDefault();

        const data = getData();

        /* EmailJS not set up yet: use manual options */
        if (!emailJsReady) {

            showManualOptions(data, "How would you like to send your message?");

            return;

        }

        setLoading(true);

        status.textContent = "Sending your message...";

        window.emailjs
            .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
                from_name: data.from_name,
                from_email: data.from_email,
                phone: data.phone || "Not provided",
                subject: data.subject,
                message: data.message,
                reply_to: data.from_email
            })
            .then(() => {

                showSuccess(data);

                form.reset();

            })
            .catch(error => {

                console.error("EmailJS error:", error);

                showManualOptions(
                    data,
                    "Sorry, we could not send it automatically. Please choose how to send it:"
                );

            })
            .finally(() => setLoading(false));

    });

}


/*==================================================
                    MOBILE MENU
==================================================*/

function initMobileMenu() {

    const menuBtn = document.getElementById("mobileMenuBtn");
    const menu = document.getElementById("mobileMenu");
    const closeBtn = document.getElementById("mobileMenuClose");
    const overlay = document.getElementById("mobileMenuOverlay");

    if (!menuBtn || !menu) return;

    const icon = menuBtn.querySelector("i");

    function openMenu() {

        menu.classList.add("active");

        if (overlay) overlay.classList.add("active");

        menuBtn.setAttribute("aria-expanded", "true");
        menuBtn.setAttribute("aria-label", "Close menu");
        menu.setAttribute("aria-hidden", "false");

        if (icon) {
            icon.classList.remove("ri-menu-3-line");
            icon.classList.add("ri-close-line");
        }

        document.body.style.overflow = "hidden";

    }

    function closeMenu() {

        menu.classList.remove("active");

        if (overlay) overlay.classList.remove("active");

        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.setAttribute("aria-label", "Open menu");
        menu.setAttribute("aria-hidden", "true");

        if (icon) {
            icon.classList.remove("ri-close-line");
            icon.classList.add("ri-menu-3-line");
        }

        document.body.style.overflow = "";

    }

    menuBtn.addEventListener("click", () => {

        if (menu.classList.contains("active")) {
            closeMenu();
        } else {
            openMenu();
        }

    });

    if (closeBtn) closeBtn.addEventListener("click", closeMenu);

    if (overlay) overlay.addEventListener("click", closeMenu);

    menu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") closeMenu();

    });

    window.addEventListener("resize", () => {

        if (window.innerWidth > 991 && menu.classList.contains("active")) {
            closeMenu();
        }

    });

}

})();