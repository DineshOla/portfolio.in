const backToTop = document.querySelector(".back-to-top");
const themeToggle = document.querySelector(".theme-toggle");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const typingText = document.getElementById("typingText");
const textArray = ["Web Developer", "Investor", "Problem Solver"];
let textIndex = 0, charIndex = 0, isDeleting = false;

// Scroll handling for back-to-top button
window.addEventListener("scroll", () => {
    backToTop.style.display = window.scrollY > 100 ? "block" : "none";
});

// Smooth scrolling for back-to-top
function topFunction() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// Smooth scrolling for navigation links
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
        if (window.innerWidth <= 768) {
            navLinks.classList.remove("active");
            menuToggle.classList.remove("active");
        }
    });
});

// Mobile menu toggle
if (menuToggle) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        menuToggle.classList.toggle("active");
    });
}

// Typing animation
function type() {
    if (!typingText) return;
    const currentText = textArray[textIndex];
    typingText.textContent = currentText.substring(0, charIndex);

    if (isDeleting) {
        charIndex--;
        if (charIndex < 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % textArray.length;
            setTimeout(type, 200);
        } else {
            setTimeout(type, 50);
        }
    } else {
        charIndex++;
        if (charIndex > currentText.length) {
            isDeleting = true;
            setTimeout(type, 1200);
        } else {
            setTimeout(type, 100);
        }
    }
}

// Start typing animation
window.addEventListener("load", () => setTimeout(type, 500));

// Theme toggle with local storage
if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const newTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
        document.body.dataset.theme = newTheme;
        themeToggle.innerHTML = newTheme === "dark" ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        localStorage.setItem("theme", newTheme);
    });

    // Initialize theme
    const savedTheme = localStorage.getItem("theme") || "light";
    document.body.dataset.theme = savedTheme;
    themeToggle.innerHTML = savedTheme === "dark" ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll(".project-card, .certificate-card, .skill-card").forEach(card => {
    observer.observe(card);
});

// Certificate card interaction
document.querySelectorAll(".certificate-card").forEach(card => {
    card.addEventListener("click", () => {
        const details = card.querySelector(".certificate-details");
        const isExpanded = details.classList.contains("expanded");
        document.querySelectorAll(".certificate-details.expanded").forEach(other => {
            if (other !== details) other.classList.remove("expanded");
        });
        details.classList.toggle("expanded", !isExpanded);
    });
});

// Lazy loading images
document.querySelectorAll("img[loading='lazy']").forEach(img => {
    img.addEventListener("load", () => img.classList.add("loaded"));
});

// Keyboard accessibility for menu toggle
if (menuToggle) {
    menuToggle.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            menuToggle.click();
        }
    });
}

// Trap focus in mobile menu
if (navLinks) {
    navLinks.addEventListener("keydown", (e) => {
        if (navLinks.classList.contains("active")) {
            const links = navLinks.querySelectorAll("a");
            const firstLink = links[0];
            const lastLink = links[links.length - 1];

            if (e.key === "Tab") {
                if (e.shiftKey && document.activeElement === firstLink) {
                    e.preventDefault();
                    lastLink.focus();
                } else if (!e.shiftKey && document.activeElement === lastLink) {
                    e.preventDefault();
                    firstLink.focus();
                }
            }
        }
    });
}