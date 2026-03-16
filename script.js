// Hero Carousel - Dynamic Image Loading
const HERO_IMAGE_COUNT = 16; // Update this number when adding/removing images
const HERO_IMAGE_PATH = 'assets/images/hero/';
const HERO_IMAGE_PREFIX = 'banner_';
const HERO_IMAGE_EXT = '.jpg';

let currentSlide = 0;
let slides = [];

// Dynamically create carousel slides
function initializeCarousel() {
    const carouselTrack = document.getElementById('carousel-track');
    
    for (let i = 1; i <= HERO_IMAGE_COUNT; i++) {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        slide.style.backgroundImage = `url('${HERO_IMAGE_PATH}${HERO_IMAGE_PREFIX}${i}${HERO_IMAGE_EXT}')`;
        
        if (i === 1) {
            slide.classList.add('active');
        }
        
        carouselTrack.appendChild(slide);
    }
    
    slides = document.querySelectorAll('.carousel-slide');
}

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Initialize carousel on page load
initializeCarousel();

// Auto-advance carousel every 5 seconds
setInterval(nextSlide, 5000);

// Update active navigation dot based on scroll position
function updateActiveDot() {
    const sections = document.querySelectorAll('section');
    const dots = document.querySelectorAll('.nav-dots-left .dot');
    
    let currentSection = 'hero';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - sectionHeight / 3) {
            currentSection = section.getAttribute('id');
        }
    });
    
    dots.forEach(dot => {
        dot.classList.remove('active');
        if (dot.getAttribute('data-section') === currentSection) {
            dot.classList.add('active');
        }
    });
}

// Smooth scroll to section when clicking dots
document.querySelectorAll('.nav-dots .dot').forEach(dot => {
    dot.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = dot.getAttribute('data-section');
        const section = document.getElementById(sectionId);
        
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Update dots on scroll
window.addEventListener('scroll', updateActiveDot);

// Initial call on page load
document.addEventListener('DOMContentLoaded', updateActiveDot);

// Add click animation to buttons
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        btn.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Lazy load images effect
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.image-placeholder, .merch-item, .partner-logo, .year-image, .ticket-image').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add parallax effect on scroll
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero-bg');
    if (hero) {
        hero.style.transform = `translateY(${window.scrollY * 0.5}px)`;
    }
});

// Mobile menu toggle (if needed)
function handleMobileMenu() {
    if (window.innerWidth <= 768) {
        document.querySelectorAll('.nav-dots').forEach(nav => {
            nav.style.display = 'none';
        });
    } else {
        document.querySelectorAll('.nav-dots').forEach(nav => {
            nav.style.display = 'flex';
        });
    }
}

window.addEventListener('resize', handleMobileMenu);
handleMobileMenu();

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
        const dots = document.querySelectorAll('.nav-dots-left .dot');
        const activeDot = document.querySelector('.nav-dots-left .dot.active');
        const activeIndex = Array.from(dots).indexOf(activeDot);
        
        if (activeIndex < dots.length - 1) {
            dots[activeIndex + 1].click();
        }
    } else if (e.key === 'ArrowUp') {
        const dots = document.querySelectorAll('.nav-dots-left .dot');
        const activeDot = document.querySelector('.nav-dots-left .dot.active');
        const activeIndex = Array.from(dots).indexOf(activeDot);
        
        if (activeIndex > 0) {
            dots[activeIndex - 1].click();
        }
    }
});

// Social links (placeholder)
document.querySelectorAll('.nav-social').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Social link would open in a new window');
    });
});
