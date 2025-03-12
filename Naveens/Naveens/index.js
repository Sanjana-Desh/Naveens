document.addEventListener('DOMContentLoaded', function () {
    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetElement = document.querySelector(link.getAttribute("href"));
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: "smooth",
                });
            }
        });
    });

    // Mobile navigation menu functionality - FIXED
    const hamburger = document.getElementById('hemberger');
    const closeBtn = document.getElementById('close');
    const navPage = document.getElementById('navpage');
    const mobileLinks = document.querySelectorAll('#mobilelinks .link');

    // Make sure mobile menu shows when hamburger is clicked
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            if (navPage) {
                navPage.style.transform = 'translateY(0)';
                navPage.style.display = 'flex'; // Ensure it's displayed
            }
        });
    }

    // Close mobile menu when X is clicked
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            if (navPage) {
                navPage.style.transform = 'translateY(-100%)';
            }
        });
    }

    // Close mobile menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navPage) {
                navPage.style.transform = 'translateY(-100%)';
            }
        });
    });

    // Navbar transparency and visibility control
    let lastScrollY = window.scrollY;
    const navbar = document.getElementById("navbar");
    
    // Debounce function to improve scroll performance
    function debounce(func, wait = 10, immediate = true) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
    
    // Optimized scroll handler with debounce
    const handleScroll = debounce(() => {
        let currentScrollY = window.scrollY;
        
        // Change background to black when scrolled down
        if (currentScrollY > 100) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
        
        // Hide navbar when scrolling down past 200px, show when scrolling up
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            navbar.classList.add("hidden");
        } else {
            navbar.classList.remove("hidden");
        }
        
        lastScrollY = currentScrollY;
    }, 10);

    window.addEventListener("scroll", handleScroll);
    
    // Implement smooth reveal animations for sections
    const revealElements = document.querySelectorAll('.card, #about img, .about-text');
    
    const revealOnScroll = debounce(() => {
        const windowHeight = window.innerHeight;
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) {
                element.classList.add('revealed');
            }
        });
    }, 10);
    
    window.addEventListener('scroll', revealOnScroll);
    
    // Call once to check initial state
    revealOnScroll();
    
    // Optimize typewriter effect
    function typeWriterEffect(element, text, speed) {
        if (!element) return;
        
        let i = 0;
        element.innerHTML = "";
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Run Typewriter Effect efficiently
    const heading = document.querySelector(".wel-h1");
    const para = document.querySelector(".wel-para");
    
    if (heading) {
        typeWriterEffect(heading, "Naveen's", 100);
    }
    
    setTimeout(() => {
        if (para) {
            const paraText = para.textContent;
            typeWriterEffect(para, paraText, 25);
        }
    }, 500);
});