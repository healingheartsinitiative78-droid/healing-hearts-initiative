/* ==================================================
   HEALING HEART INITIATIVE
   GALLERY PAGE JAVASCRIPT
   ================================================== */
document.addEventListener("DOMContentLoaded", () => {

    initPreloader();
    initMobileMenu();

    // Create gallery photos first
    initGalleryPhotos();

    // Then activate gallery features
    initGalleryFilters();
    initLightbox();
    initLoadMore();

    // Other page functionality
    initRevealAnimations();
    initVideoButtons();

});


/* ==================================================
   1. MOBILE MENU
   ================================================== */

function initMobileMenu() {

    const menuBtn = document.getElementById("mobileMenuBtn");
    const menu = document.getElementById("mobileMenu");
    const closeBtn = document.getElementById("mobileMenuClose");
    const overlay = document.getElementById("mobileMenuOverlay");

    if (!menuBtn || !menu) return;

    const icon = menuBtn.querySelector("i");

    function openMenu() {

        menu.classList.add("active");

        if (overlay) {
            overlay.classList.add("active");
            overlay.setAttribute("aria-hidden", "false");
        }

        menu.setAttribute("aria-hidden", "false");

        menuBtn.setAttribute("aria-expanded", "true");
        menuBtn.setAttribute("aria-label", "Close menu");

        if (icon) {
            icon.classList.remove("ri-menu-3-line");
            icon.classList.add("ri-close-line");
        }

        document.body.style.overflow = "hidden";
    }


    function closeMenu() {

        menu.classList.remove("active");

        if (overlay) {
            overlay.classList.remove("active");
            overlay.setAttribute("aria-hidden", "true");
        }

        menu.setAttribute("aria-hidden", "true");

        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.setAttribute("aria-label", "Open menu");

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


    if (closeBtn) {
        closeBtn.addEventListener("click", closeMenu);
    }


    if (overlay) {
        overlay.addEventListener("click", closeMenu);
    }


    menu.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", closeMenu);

    });


    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeMenu();
        }

    });


    window.addEventListener("resize", () => {

        if (window.innerWidth > 991) {
            closeMenu();
        }

    });

}
/* ==================================================
   GALLERY PHOTO DATA
================================================== */

const galleryImages = [

    /* ================================================
       COMMUNITY OUTREACH
    ================================================= */

    {
        image: "image/community and outreach/photo19.jpeg",
        category: "community and outreach",
        title: "Community Outreach",
        description: "Connecting with communities and bringing support closer."
    },

    {
        image: "image/community and outreach/photo01.jpeg",
        category: "community and outreach",
        title: "Community Outreach",
        description: "Working together to create positive change."
    },
     {
        image: "image/community and outreach/photo02.jpg",
        category: "community and outreach",
        title: "Community Outreach",
        description: "Working together to create positive change."
    },

    


    /* ================================================
       MENTAL HEALTH
    ================================================= */

    {
        image: "image/mental health/mental 1.jpeg",
        category: "mental-health",
        title: "Mental Health Awareness",
        description: "Creating safe spaces for conversations about mental well-being."
    },

        {
        image: "image/mental health/mental 2.jpeg",
        category: "mental-health",
        title: "Mental Health Awareness",
        description: "Creating safe spaces for conversations about mental well-being."
    },

        {
        image: "image/mental health/mental 3.jpeg",
        category: "mental-health",
        title: "Mental Health Awareness",
        description: "Creating safe spaces for conversations about mental well-being."
    },



 


    /* ================================================
       EDUCATION
    ================================================= */

    {
        image: "image/education/education 2.jpeg",
        category: "education",
        title: "Education & Training",
        description: "Building knowledge and skills through education."
    },

    {
        image: "image/education/education 1.jpeg",
        category: "education",
        title: "Education & Training",
        description: "Building knowledge and skills through education."
    },


    {
        image: "image/education/education 3.jpeg",
        category: "education",
        title: "Education & Training",
        description: "Building knowledge and skills through education."
    },



 


    /* ================================================
       EVENTS
    ================================================= */

    {
        image: "image/events/events 1.jpeg",
        category: "events",
        title: "Community Event",
        description: "Bringing people together through meaningful events."
    },

      {
        image: "image/events/events 2.jpeg",
        category: "events",
        title: "Community Event",
        description: "Bringing people together through meaningful events."
    },

      {
        image: "image/events/events 3.jpeg",
        category: "events",
        title: "Community Event",
        description: "Bringing people together through meaningful events."
        
    },

];
/* ==================================================
   GALLERY PHOTO DATA & CONFIGURATION
================================================== */

const galleryCategories = [

    /* ================================================
       COMMUNITY OUTREACH
    ================================================= */

    {
        folder: "community and outreach",
        name: "Community Outreach",

        photos: [
            "photo03.jpg",
            "photo04.jpg",
            "photo05.jpg",
            "photo06.jpg",
            "photo07.jpg",
            "photo08.jpg",
            "photo09.jpg",
            "photo10.jpg",
            "photo11.jpg",
            "photo12.jpg",
            "photo13.jpg",
            "photo14.jpg",
            "photo15.jpg",
            "photo16.jpeg",
            "photo17.jpeg",
            "photo18.jpeg",
            "photo19.jpeg",
            "photo20.jpeg"
        ]
    },


    /* ================================================
       MENTAL HEALTH
    ================================================= */

    {
        folder: "mental health",
        name: "Mental Health",

        photos: [
            "mental 4.jpeg",
            "mental 5.jpeg",
            "mental 6.jpeg",
            "mental 7.jpeg",
            "mental 8.jpeg",
            "mental 9.jpeg",
            "mental 10.jpeg"
           
        ]
    },


    /* ================================================
       EDUCATION
    ================================================= */

    {
        folder: "education",
        name: "Education",

        photos: [
            "education 4.jpeg",
            "education 5.jpeg",
            "education 6.jpeg",
            "education 7.jpeg",
            "education 8.jpeg",
            "education 9.jpeg",
            "education 10.jpeg",
            "education 11.jpeg",
            "education 12.jpeg",
            "education 13.jpeg",
            "education 14.jpeg"
            

           
        ]
    },


    /* ================================================
       EVENTS
    ================================================= */

    {
        folder: "events",
        name: "Events",

        photos: [
            "events 4.jpeg",
            "events 5.jpeg",
            "events 6.jpeg",
            "events 7.jpeg",
            "events 8.jpeg",
            "events 9.jpeg",
            "events 10.jpeg",
            "events 11.jpeg",
            "events 12.jpeg",
            "events 13.jpeg",
            "events 14.jpeg",
            "events 15.jpeg",
            "events 16.jpeg",
            "events 17.jpeg",
            "events 18.jpeg",
            "events 19.jpeg",
            "events 20.jpeg",
            "events 21.jpeg",
            "events 22.jpeg",
            "events 23.jpeg",
            "events 24.jpeg"
    
           

           
        ]
    }

];


/* ==================================================
   CREATE GALLERY IMAGES
================================================== */




galleryCategories.forEach(category => {

    category.photos.forEach(photo => {

        galleryImages.push({

            image:
                `image/${category.folder}/${photo}`,

            category:
                category.folder,

            categoryName:
                category.name,

            title:
                category.name,

            description:
                `Moments from our ${category.name.toLowerCase()} activities.`

        });

    });

});
/* ==================================================
   CREATE PHOTO CARDS
================================================== */

function initGalleryPhotos() {

    const gallery =
        document.getElementById("galleryPhotoGrid");

    if (!gallery) {
        return;
    }


    gallery.innerHTML = "";


    galleryImages.forEach((photo, index) => {

        const card =
            document.createElement("article");

        card.className =
            "gallery-photo-card gallery-reveal";


        


        card.dataset.category =
            photo.category;

        card.dataset.title =
            photo.title;

        card.dataset.description =
            photo.description;


        card.innerHTML = `

            <img
                src="${photo.image}"
                alt="${photo.title}"
                loading="lazy">

            <div class="gallery-photo-overlay">

               <span class="gallery-photo-category">
    ${photo.categoryName || photo.title}
</span>

                <h3>
                    ${photo.title}
                </h3>

                <p>
                    ${photo.description}
                </p>

            </div>


            <span
                class="gallery-view-icon"
                aria-hidden="true">

                <i class="ri-search-line"></i>

            </span>

        `;


        gallery.appendChild(card);

    });

}

/* ==================================================
   GALLERY FILTERS
================================================== */

function initGalleryFilters() {

    const filterButtons =
        document.querySelectorAll(".gallery-filter");

    const photoCards =
        Array.from(
            document.querySelectorAll(
                ".gallery-photo-card"
            )
        );


    if (!filterButtons.length || !photoCards.length) {
        return;
    }


    const initialVisible = 12;


    function applyFilter(selectedFilter) {

        let matchingCards =
            photoCards.filter(card => {

                const category =
                    card.dataset.category || "";

                return (
                    selectedFilter === "all" ||
                    category === selectedFilter
                );

            });


        photoCards.forEach(card => {

            card.classList.add("hidden");
            card.classList.remove("visible");

        });


        matchingCards
            .slice(0, initialVisible)
            .forEach(card => {

                card.classList.remove("hidden");

                requestAnimationFrame(() => {
                    card.classList.add("visible");
                });

            });


        updateLoadMoreButton(
            matchingCards.length,
            initialVisible
        );

    }


    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            const selectedFilter =
                button.dataset.filter || "all";


            filterButtons.forEach(btn => {

                btn.classList.remove("active");

            });


            button.classList.add("active");


            applyFilter(selectedFilter);

        });

    });


    // Show first 12 when page opens

    applyFilter("all");

}

/* ==================================================
   3. LIGHTBOX
   ================================================== */

function initLightbox() {

    const lightbox =
        document.getElementById("galleryLightbox");


    if (!lightbox) {
        return;
    }


    const lightboxImage =
        lightbox.querySelector(".gallery-lightbox-image");


    const captionTitle =
        lightbox.querySelector(
            ".gallery-lightbox-caption h3"
        );


    const captionCategory =
        lightbox.querySelector(
            ".gallery-lightbox-caption span"
        );


    const closeButton =
        lightbox.querySelector(
            ".gallery-lightbox-close"
        );


    const previousButton =
        lightbox.querySelector(
            ".gallery-lightbox-prev"
        );


    const nextButton =
        lightbox.querySelector(
            ".gallery-lightbox-next"
        );


    const photoCards =
        Array.from(
            document.querySelectorAll(
                ".gallery-photo-card"
            )
        );


    if (!lightboxImage || !photoCards.length) {
        return;
    }


    let currentIndex = 0;


    /* Get only visible gallery cards */

    function getVisibleCards() {

        return photoCards.filter(card => {

            return !card.classList.contains("hidden");

        });

    }


    /* Show image */

    function showImage(index) {

        const visibleCards =
            getVisibleCards();


        if (!visibleCards.length) {
            return;
        }


        /* Loop backwards */

        if (index < 0) {

            index =
                visibleCards.length - 1;

        }


        /* Loop forwards */

        if (index >= visibleCards.length) {

            index = 0;

        }


        currentIndex = index;


        const card =
            visibleCards[currentIndex];


        const image =
            card.querySelector("img");


        if (!image) {
            return;
        }


        lightboxImage.src =
            image.currentSrc || image.src;


        lightboxImage.alt =
            image.alt || "Gallery image";


        /* Title */

        if (captionTitle) {

            captionTitle.textContent =
                card.dataset.title ||
                image.alt ||
                "Healing Heart Initiative";

        }


        /* Category */

        if (captionCategory) {

            const category =
                card.querySelector(
                    ".gallery-photo-category"
                );


            captionCategory.textContent =
                category
                    ? category.textContent.trim()
                    : "";

        }

    }


    /* Open lightbox */

    function openLightbox(card) {

        const visibleCards =
            getVisibleCards();


        const index =
            visibleCards.indexOf(card);


        if (index === -1) {
            return;
        }


        showImage(index);


        lightbox.classList.add("active");


        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.style.overflow =
            "hidden";


        if (closeButton) {
            closeButton.focus();
        }

    }


    /* Close lightbox */

    function closeLightbox() {

        lightbox.classList.remove("active");


        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.style.overflow =
            "";


        setTimeout(() => {

            if (
                !lightbox.classList.contains(
                    "active"
                )
            ) {

                lightboxImage.removeAttribute(
                    "src"
                );

            }

        }, 300);

    }


    /* Previous */

    function showPrevious() {

        showImage(
            currentIndex - 1
        );

    }


    /* Next */

    function showNext() {

        showImage(
            currentIndex + 1
        );

    }


    /* Make every photo clickable */

    photoCards.forEach(card => {

        card.addEventListener(
            "click",
            event => {

                /*
                 * Don't open the lightbox when
                 * clicking a button or link.
                 */

                if (
                    event.target.closest(
                        "a, button"
                    )
                ) {
                    return;
                }


                openLightbox(card);

            }
        );


        /* Keyboard accessibility */

        card.setAttribute(
            "tabindex",
            "0"
        );


        card.setAttribute(
            "role",
            "button"
        );


        card.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    openLightbox(card);

                }

            }
        );

    });


    /* Close */

    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeLightbox
        );

    }


    /* Previous */

    if (previousButton) {

        previousButton.addEventListener(
            "click",
            showPrevious
        );

    }


    /* Next */

    if (nextButton) {

        nextButton.addEventListener(
            "click",
            showNext
        );

    }


    /* Click outside image */

    lightbox.addEventListener(
        "click",
        event => {

            if (
                event.target === lightbox
            ) {

                closeLightbox();

            }

        }
    );


    /* Keyboard controls */

    document.addEventListener(
        "keydown",
        event => {

            if (
                !lightbox.classList.contains(
                    "active"
                )
            ) {
                return;
            }


            if (event.key === "Escape") {

                closeLightbox();

            }


            if (event.key === "ArrowLeft") {

                showPrevious();

            }


            if (event.key === "ArrowRight") {

                showNext();

            }

        }
    );

}


/* ==================================================
   LOAD MORE PHOTOS
================================================== */

function initLoadMore() {

    const loadButton = document.querySelector(
        ".gallery-load-button"
    );

    if (!loadButton) {
        return;
    }

    const photosPerLoad = 12;

    let visibleCount = 12;


    /* ==================================================
       SHOW MORE PHOTOS
    ================================================== */

    loadButton.addEventListener("click", () => {

        const activeFilter = document.querySelector(
            ".gallery-filter.active"
        );

        const selectedFilter = activeFilter
            ? activeFilter.dataset.filter
            : "all";


        const photoCards = Array.from(
            document.querySelectorAll(
                ".gallery-photo-card"
            )
        );


        /* Get only photos belonging
           to the selected category */

        const matchingCards = photoCards.filter(card => {

            const category =
                card.dataset.category || "";

            return (
                selectedFilter === "all" ||
                category === selectedFilter
            );

        });


        /* Show the next 12 photos */

        const nextCards = matchingCards.slice(
            visibleCount,
            visibleCount + photosPerLoad
        );


        nextCards.forEach(card => {

            card.classList.remove("hidden");

            card.classList.add("visible");

        });


        /* Increase the number of visible photos */

        visibleCount += nextCards.length;


        /* Hide Load More when
           there are no more photos */

        if (visibleCount >= matchingCards.length) {

            loadButton.style.display = "none";

        }

    });


    /* ==================================================
       RESET WHEN CATEGORY CHANGES
    ================================================== */

    document
        .querySelectorAll(".gallery-filter")
        .forEach(button => {

            button.addEventListener("click", () => {

                visibleCount = 12;

                const selectedFilter =
                    button.dataset.filter;


                const photoCards =
                    Array.from(
                        document.querySelectorAll(
                            ".gallery-photo-card"
                        )
                    );


                /* First hide all cards */

                photoCards.forEach(card => {

                    card.classList.add("hidden");

                    card.classList.remove("visible");

                });


                /* Find cards for selected category */

                const matchingCards =
                    photoCards.filter(card => {

                        const category =
                            card.dataset.category || "";

                        return (
                            selectedFilter === "all" ||
                            category === selectedFilter
                        );

                    });


                /* Show first 12 */

                matchingCards
                    .slice(0, 12)
                    .forEach(card => {

                        card.classList.remove("hidden");

                        card.classList.add("visible");

                    });


                /* Update button */

                if (
                    matchingCards.length > 12
                ) {

                    loadButton.style.display =
                        "inline-flex";

                }
                else {

                    loadButton.style.display =
                        "none";

                }

            });

        });

}
function updateLoadMoreButton(
    totalMatching,
    visibleAmount
) {

    const loadButton =
        document.querySelector(
            ".gallery-load-button"
        );

    if (!loadButton) {
        return;
    }

    if (totalMatching <= visibleAmount) {

        loadButton.style.display = "none";

    }
    else {

        loadButton.style.display = "inline-flex";

    }

}
/* ==================================================
   5. SCROLL REVEAL ANIMATIONS
   ================================================== */

function initRevealAnimations() {

    const elements =
        document.querySelectorAll(
            ".gallery-reveal"
        );


    if (!elements.length) {
        return;
    }


    /* Respect reduced motion */

    if (
        window.matchMedia &&
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        elements.forEach(element => {

            element.classList.add(
                "visible"
            );

        });

        return;

    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        !entry.isIntersecting
                    ) {
                        return;
                    }


                    entry.target.classList.add(
                        "visible"
                    );


                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12,
                rootMargin:
                    "0px 0px -40px 0px"
            }
        );


    elements.forEach(element => {

        observer.observe(element);

    });

}


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

/* ==================================================
   8. HTML SAFETY HELPER
   ================================================== */

function escapeHtml(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}
/* ==================================================
   PRELOADER
   ================================================== */

function initPreloader() {

    const preloader = document.getElementById("preloader");

    if (!preloader) return;

    window.addEventListener("load", () => {

        setTimeout(() => {

            preloader.classList.add("loaded");

            setTimeout(() => {
                preloader.remove();
            }, 500);

        }, 300);

    });

}