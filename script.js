/*=========================================================
    HEALING HEART INITIATIVE
    Premium Website
=========================================================*/
document.addEventListener("DOMContentLoaded", () => {

    initPreloader();
    initStickyHeader();
    initMobileMenu();
    initSmoothScroll();
    initHeroSlider();

    initCounters();
    initRevealAnimations();
    initFAQ();
    initGallery();
    initBackToTop();
    initDarkMode();
     initVideoButtons();

});

/*=========================================================
    PRELOADER
=========================================================*/

function initPreloader() {

    const preloader = document.getElementById("preloader");

    if (!preloader) return;

    window.addEventListener("load", () => {

        preloader.style.opacity = "0";
        preloader.style.visibility = "hidden";

        setTimeout(() => {

            preloader.remove();

        }, 700);

    });

}

/*=========================================================
    STICKY HEADER
=========================================================*/

function initStickyHeader() {

    const header = document.querySelector(".header");

    if (!header) return;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 80) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    });

}

/*=========================================================
    MOBILE MENU
=========================================================*/


/*=========================================================
    MOBILE MENU
=========================================================*/

function initMobileMenu() {

    const menuBtn = document.querySelector(".menu-toggle");
    const navbar = document.querySelector(".navbar");
    const overlay = document.querySelector(".menu-overlay");
    const closeBtn = document.querySelector(".mobile-close");

    if (!menuBtn || !navbar) return;

    const icon = menuBtn.querySelector("i");


    function openMenu() {

        navbar.classList.add("active");

        if (overlay) {
            overlay.classList.add("active");
        }

        menuBtn.setAttribute("aria-expanded", "true");
        menuBtn.setAttribute("aria-label", "Close menu");

        if (icon) {
            icon.classList.remove("ri-menu-3-line");
            icon.classList.add("ri-close-line");
        }

        document.body.style.overflow = "hidden";
    }


    function closeMenu() {

        navbar.classList.remove("active");

        if (overlay) {
            overlay.classList.remove("active");
        }

        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.setAttribute("aria-label", "Open menu");

        if (icon) {
            icon.classList.remove("ri-close-line");
            icon.classList.add("ri-menu-3-line");
        }

        document.body.style.overflow = "";
    }


    function toggleMenu() {

        if (navbar.classList.contains("active")) {
            closeMenu();
        } else {
            openMenu();
        }

    }


    /* Hamburger button */
    menuBtn.addEventListener("click", toggleMenu);


    /* X button inside menu */
    if (closeBtn) {
        closeBtn.addEventListener("click", closeMenu);
    }


    /* Dark overlay */
    if (overlay) {
        overlay.addEventListener("click", closeMenu);
    }


    /* Close when clicking a navigation link */
    navbar.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", closeMenu);

    });


    /* Close with Escape */
    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeMenu();
        }

    });


    /* Reset menu when returning to desktop */
    window.addEventListener("resize", () => {

        if (window.innerWidth > 992) {
            closeMenu();
        }

    });

}

/*=========================================================
    SMOOTH SCROLL
=========================================================*/

function initSmoothScroll() {

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth",
                block: "start"

            });

        });

    });

}

/*=========================================================
                HERO SLIDER
=========================================================*/

function initHeroSlider() {

    const slides = document.querySelectorAll(".hero-slider img");
    const dots = document.querySelectorAll(".dot");

    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");

    if (!slides.length) return;

    let current = 0;

    let interval;

    function showSlide(index) {

        slides.forEach(slide => {

            slide.classList.remove("active");

        });

        dots.forEach(dot => {

            dot.classList.remove("active");

        });

        slides[index].classList.add("active");

        if (dots[index]) {

            dots[index].classList.add("active");

        }

    }

    function nextSlide() {

        current++;

        if (current >= slides.length) {

            current = 0;

        }

        showSlide(current);

    }

    function prevSlide() {

        current--;

        if (current < 0) {

            current = slides.length - 1;

        }

        showSlide(current);

    }

    function startSlider() {

        interval = setInterval(nextSlide, 5000);

    }

    function stopSlider() {

        clearInterval(interval);

    }

    nextBtn?.addEventListener("click", () => {

        nextSlide();

        stopSlider();

        startSlider();

    });

    prevBtn?.addEventListener("click", () => {

        prevSlide();

        stopSlider();

        startSlider();

    });

    dots.forEach((dot, index) => {

        dot.addEventListener("click", () => {

            current = index;

            showSlide(current);

            stopSlider();

            startSlider();

        });

    });

    const hero = document.querySelector(".hero");

    hero?.addEventListener("mouseenter", stopSlider);

    hero?.addEventListener("mouseleave", startSlider);

    document.addEventListener("keydown", e => {

        if (e.key === "ArrowRight") {

            nextSlide();

        }

        if (e.key === "ArrowLeft") {

            prevSlide();

        }

    });

    let touchStart = 0;

    let touchEnd = 0;

    hero?.addEventListener("touchstart", e => {

        touchStart = e.changedTouches[0].screenX;

    });

    hero?.addEventListener("touchend", e => {

        touchEnd = e.changedTouches[0].screenX;

        if (touchStart - touchEnd > 50) {

            nextSlide();

        }

        if (touchEnd - touchStart > 50) {

            prevSlide();

        }

    });

    showSlide(current);

    startSlider();

}

/*=========================================================
                ANIMATED COUNTERS
=========================================================*/

function initCounters() {

    const counters = document.querySelectorAll("[data-count]");

    if (!counters.length) return;

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;

            const target = Number(counter.dataset.count);

            const duration = 1800;

            const step = target / (duration / 16);

            let value = 0;

            const timer = setInterval(() => {

                value += step;

                if (value >= target) {

                    value = target;
                    counter.textContent = target + "+";

                    clearInterval(timer);

                }

                counter.textContent = Math.floor(value) + "+";

            }, 16);

            observer.unobserve(counter);

        });

    }, {

        threshold: 0.5

    });

    counters.forEach(counter => observer.observe(counter));

}
/*=========================================================
                SCROLL REVEAL
=========================================================*/

function initRevealAnimations() {

    const elements = document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right, .reveal-zoom"
    );

    if (!elements.length) return;

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                observer.unobserve(entry.target);

            }

        });

    }, {

        threshold: 0.15

    });

    elements.forEach(element => {

        observer.observe(element);

    });

}
/*=========================================================
                FAQ ACCORDION
=========================================================*/

function initFAQ() {

    const items = document.querySelectorAll(".faq-item");

    if (!items.length) return;

    items.forEach(item => {

        const button = item.querySelector(".faq-question");

        button.addEventListener("click", () => {

            items.forEach(other => {

                if (other !== item) {

                    other.classList.remove("active");

                }

            });

            item.classList.toggle("active");

        });

    });

}
/*=========================================================
                GALLERY
=========================================================*/

function initGallery() {

    const items = document.querySelectorAll(".gallery-item");
    const buttons = document.querySelectorAll(".filter-btn");

    const lightbox = document.querySelector(".lightbox");
    const image = document.getElementById("lightbox-image");
    const close = document.querySelector(".close-lightbox");

    if (!items.length) return;

    /* Filters */

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            buttons.forEach(btn => btn.classList.remove("active"));

            button.classList.add("active");

            const filter = button.dataset.filter;

            items.forEach(item => {

                if (filter === "all" || item.classList.contains(filter)) {

                    item.style.display = "block";

                } else {

                    item.style.display = "none";

                }

            });

        });

    });

    /* Lightbox */

    items.forEach(item => {

        item.addEventListener("click", () => {

            const img = item.querySelector("img");

            image.src = img.src;
            image.alt = img.alt;

            lightbox.classList.add("active");

        });

    });

    close.addEventListener("click", () => {

        lightbox.classList.remove("active");

    });

    lightbox.addEventListener("click", e => {

        if (e.target === lightbox) {

            lightbox.classList.remove("active");

        }

    });

    document.addEventListener("keydown", e => {

        if (e.key === "Escape") {

            lightbox.classList.remove("active");

        }

    });

}
/*=========================================================
                BACK TO TOP
=========================================================*/

function initBackToTop() {

    const button = document.getElementById("backToTop");

    if (!button) return;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            button.classList.add("show");

        } else {

            button.classList.remove("show");

        }

    });

    button.addEventListener("click", () => {

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}

/*=========================================================
                DARK MODE
=========================================================*/

function initDarkMode() {

    const toggle = document.getElementById("themeToggle");

    if (!toggle) return;

    const icon = toggle.querySelector("i");

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {

        document.body.classList.toggle("dark", savedTheme === "dark");

    } else {

        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

        document.body.classList.toggle("dark", prefersDark);

    }

    updateIcon();

    toggle.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        localStorage.setItem(

            "theme",

            document.body.classList.contains("dark") ? "dark" : "light"

        );

        updateIcon();

    });

    function updateIcon() {

        if (document.body.classList.contains("dark")) {

            icon.classList.remove("ri-moon-line");
            icon.classList.add("ri-sun-line");

        } else {

            icon.classList.remove("ri-sun-line");
            icon.classList.add("ri-moon-line");

        }

    }

}
/*=====================================================
        IMPACT SECTION
======================================================*/

document.addEventListener("DOMContentLoaded", () => {

    const impact = document.querySelector(".impact-section");

    if (!impact) return;

    const counters = impact.querySelectorAll(".counter");

    let hasAnimated = false;

    const animateCounter = (counter) => {

        const target = Number(counter.dataset.target);

        const duration = 1800;

        const start = performance.now();

        function update(time){

            const progress = Math.min((time - start) / duration, 1);

            const ease = 1 - Math.pow(1 - progress, 3);

            counter.textContent = Math.floor(target * ease).toLocaleString();

            if(progress < 1){

                requestAnimationFrame(update);

            }

        }

        requestAnimationFrame(update);

    };

    const observer = new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting && !hasAnimated){

                hasAnimated = true;

                counters.forEach((counter,index)=>{

                    setTimeout(()=>{

                        animateCounter(counter);

                    }, index * 180);

                });

            }

        });

    },{

        threshold:.35

    });

    observer.observe(impact);

});
/*=====================================================
        SUCCESS STORIES
======================================================*/

const stories = [

{

image:"assets/images/stories/story1.jpg",

person:"assets/images/stories/person1.jpg",

quote:"Healing Heart Initiative gave me confidence to seek support and believe in my future again.",

text:"Through counseling sessions and peer support, I regained confidence and now mentor other young people.",

name:"Diane M.",

role:"University Student"

},

{

image:"assets/images/stories/story2.jpg",

person:"assets/images/stories/person2.jpg",

quote:"I discovered that asking for help is a sign of strength, not weakness.",

text:"The youth leadership program helped me become a confident community volunteer and advocate for mental wellbeing.",

name:"Patrick K.",

role:"Youth Volunteer"

},

{

image:"assets/images/stories/story3.jpg",

person:"assets/images/stories/person3.jpg",

quote:"The workshops changed how our school talks about mental health.",

text:"Students now support one another openly, and teachers have better tools to recognize when someone needs help.",

name:"Grace N.",

role:"Teacher"

}

];

let currentStory=0;

const storyImage=document.querySelector(".story-image img");

const quote=document.querySelector(".story-content h3");

const text=document.querySelector(".story-content p");

const person=document.querySelector(".story-person img");

const name=document.querySelector(".story-person h4");

const role=document.querySelector(".story-person span");

const dots=document.querySelectorAll(".story-dots span");

function loadStory(index){

storyImage.style.opacity=0;

document.querySelector(".story-content").style.opacity=0;

setTimeout(()=>{

storyImage.src=stories[index].image;

person.src=stories[index].person;

quote.textContent=`"${stories[index].quote}"`;

text.textContent=stories[index].text;

name.textContent=stories[index].name;

role.textContent=stories[index].role;

storyImage.style.opacity=1;

document.querySelector(".story-content").style.opacity=1;

dots.forEach(dot=>dot.classList.remove("active"));

dots[index].classList.add("active");

},300);

}

document.querySelector(".story-next")

.addEventListener("click",()=>{

currentStory++;

if(currentStory>=stories.length){

currentStory=0;

}

loadStory(currentStory);

});

document.querySelector(".story-prev")

.addEventListener("click",()=>{

currentStory--;

if(currentStory<0){

currentStory=stories.length-1;

}

loadStory(currentStory);

});

dots.forEach((dot,index)=>{

dot.addEventListener("click",()=>{

currentStory=index;

loadStory(index);

});

});

setInterval(()=>{

currentStory++;

if(currentStory>=stories.length){

currentStory=0;

}

loadStory(currentStory);

},7000);

/* ==================================================
   VIDEO HIGHLIGHTS
================================================== */


/* ==================================================
   INITIALIZE VIDEO BUTTONS
================================================== */

function initVideoButtons() {

    const playButtons =
        document.querySelectorAll(
            ".gallery-play-button"
        );


    if (!playButtons.length) {

        return;

    }


    playButtons.forEach(button => {

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();


                /* Find the video card */

                const card =
                    button.closest(
                        ".gallery-video-card"
                    );


                if (!card) {

                    return;

                }


                /* Get video path */

                const videoUrl =
                    card.dataset.video;


                if (!videoUrl) {

                    console.warn(
                        "No data-video found on video card.",
                        card
                    );

                    return;

                }


                /* Open video */

                openVideoModal(videoUrl);

            }
        );

    });

}


/* ==================================================
   OPEN VIDEO MODAL
================================================== */

function openVideoModal(videoUrl) {

    /* Remove an existing modal */

    const existingModal =
        document.getElementById(
            "galleryVideoModal"
        );


    if (existingModal) {

        existingModal.remove();

    }


    /* Create modal */

    const modal =
        document.createElement("div");


    modal.id =
        "galleryVideoModal";


    modal.className =
        "gallery-video-modal";


    /* Modal HTML */

    modal.innerHTML = `

        <button
            type="button"
            class="gallery-video-modal-close"
            aria-label="Close video">

            <i class="ri-close-line"></i>

        </button>


        <div class="gallery-video-modal-content">

            <video
                class="gallery-video-player"
                controls
                autoplay
                playsinline>

                <source src="${videoUrl}">

                Your browser does not support HTML5 video.

            </video>

        </div>

    `;


    /* Add modal to page */

    document.body.appendChild(modal);


    /* Prevent page scrolling */

    document.body.style.overflow =
        "hidden";


    /* Activate modal */

    requestAnimationFrame(() => {

        modal.classList.add("active");

    });


    /* Get elements */

    const closeButton =
        modal.querySelector(
            ".gallery-video-modal-close"
        );


    const video =
        modal.querySelector(
            ".gallery-video-player"
        );


    /* ==================================================
       CLOSE VIDEO
    ================================================== */

    function closeVideo() {

        if (video) {

            video.pause();

            video.removeAttribute("src");

            video.load();

        }


        modal.classList.remove("active");


        document.body.style.overflow = "";


        setTimeout(() => {

            if (modal) {

                modal.remove();

            }

        }, 300);


        document.removeEventListener(
            "keydown",
            handleEscape
        );

    }


    /* ==================================================
       CLOSE BUTTON
    ================================================== */

    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeVideo
        );

    }


    /* ==================================================
       CLICK OUTSIDE VIDEO
    ================================================== */

    modal.addEventListener(
        "click",
        function (event) {

            if (event.target === modal) {

                closeVideo();

            }

        }
    );


    /* ==================================================
       ESCAPE KEY
    ================================================== */

    function handleEscape(event) {

        if (event.key === "Escape") {

            closeVideo();

        }

    }


    document.addEventListener(
        "keydown",
        handleEscape
    );

}