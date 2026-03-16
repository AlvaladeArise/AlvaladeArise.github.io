// Hero Carousel - Dynamic Image Loading
const HERO_IMAGE_COUNT = 16; // Update this number when adding/removing images
const HERO_IMAGE_PATH = 'assets/images/hero/';
const HERO_IMAGE_PREFIX = 'banner_';
const HERO_IMAGE_EXT = '.jpg';

let currentSlide = 0;
let slides = [];

const I18N = {
    pt: {
        pageTitle: 'Alvalade Arise Fest',
        buyTicketsAria: 'Comprar bilhetes',
        ticketBannerLabel: 'Bilhetes disponíveis',
        ticketBannerCta: 'Comprar Agora',
        fridayHeader: 'Sexta 22 de Maio',
        saturdayHeader: 'Sábado 23 de Maio',
        freeCamping: 'Campismo grátis',
        freeCampingFull: 'Campismo gratuito',
        ticketsHeading: 'Bilhetes já disponíveis',
        fullPassTag: 'Passe Completo',
        fullPassTitle: 'Passe Geral 22 e 23 de maio',
        fullPassDesc: 'Acesso geral válido para os dois dias do festival, com todas as bandas de 22 e 23.',
        fullPassFactsAria: 'Informações do passe completo',
        fullPassFactBands: '15 bandas em 2 dias',
        day1Tag: 'Dia 1',
        day1Title: 'Sexta 22 de maio',
        day1Desc: 'Bilhete diário para sexta-feira com acesso completo ao recinto.',
        day1FactsAria: 'Informações de sexta 22',
        day1FactBands: '5 bandas na sexta',
        day2Tag: 'Dia 2',
        day2Title: 'Sábado 23 de maio',
        day2Desc: 'Bilhete diário para sábado com acesso completo ao recinto.',
        day2FactsAria: 'Informações de sábado 23',
        day2FactBands: '10 bandas no sábado',
        buy: 'Comprar',
        contactsTitle: 'Contactos',
        contactsLead: 'Fala connosco para bilhetes, informações e novidades do festival.',
        website: 'Website',
        address: 'Morada',
        email: 'Email',
        socialNetworks: 'Redes sociais',
        quickActionsAria: 'Ações rápidas de contacto',
        map: 'Mapa',
        organization: 'Organização',
        support: 'Apoio',
        partners: 'Parceiros',
        footerRights: '© 2026 Alvalade Arise · Todos os direitos reservados'
    },
    en: {
        pageTitle: 'Alvalade Arise - Music Festival',
        buyTicketsAria: 'Buy tickets',
        ticketBannerLabel: 'Tickets available',
        ticketBannerCta: 'Buy Now',
        fridayHeader: 'Friday 22 May',
        saturdayHeader: 'Saturday 23 May',
        freeCamping: 'Free camping',
        freeCampingFull: 'Free camping',
        ticketsHeading: 'Tickets now available',
        fullPassTag: 'Full Pass',
        fullPassTitle: 'General Pass 22 and 23 May',
        fullPassDesc: 'General access for both festival days, with all bands on the 22nd and 23rd.',
        fullPassFactsAria: 'Full pass info',
        fullPassFactBands: '15 bands in 2 days',
        day1Tag: 'Day 1',
        day1Title: 'Friday 22 May',
        day1Desc: 'Day ticket for Friday with full access to the venue.',
        day1FactsAria: 'Friday 22 info',
        day1FactBands: '5 bands on Friday',
        day2Tag: 'Day 2',
        day2Title: 'Saturday 23 May',
        day2Desc: 'Day ticket for Saturday with full access to the venue.',
        day2FactsAria: 'Saturday 23 info',
        day2FactBands: '10 bands on Saturday',
        buy: 'Buy',
        contactsTitle: 'Contacts',
        contactsLead: 'Talk to us for tickets, updates, and festival news.',
        website: 'Website',
        address: 'Address',
        email: 'Email',
        socialNetworks: 'Social networks',
        quickActionsAria: 'Quick contact actions',
        map: 'Map',
        organization: 'Organization',
        support: 'Support',
        partners: 'Partners',
        footerRights: 'Â© 2026 Alvalade Arise Â· All rights reserved'
    }
};

function applyLanguage(language) {
    const lang = language === 'en' ? 'en' : 'pt';
    const dictionary = I18N[lang];

    document.documentElement.lang = lang === 'en' ? 'en' : 'pt-BR';
    document.title = dictionary.pageTitle;

    document.querySelectorAll('[data-i18n]').forEach((el) => {
        const key = el.getAttribute('data-i18n');
        if (dictionary[key]) {
            el.textContent = dictionary[key];
        }
    });

    document.querySelectorAll('[data-i18n-aria-label]').forEach((el) => {
        const key = el.getAttribute('data-i18n-aria-label');
        if (dictionary[key]) {
            el.setAttribute('aria-label', dictionary[key]);
        }
    });

    document.querySelectorAll('.lang-btn').forEach((btn) => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    localStorage.setItem('siteLanguage', lang);
    updateLanguageInUrl(lang);
}

function getLanguageFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const urlLang = (params.get('lang') || '').toLowerCase();
    return urlLang === 'en' || urlLang === 'pt' ? urlLang : null;
}

function updateLanguageInUrl(lang) {
    const url = new URL(window.location.href);
    url.searchParams.set('lang', lang);
    window.history.replaceState({}, '', url.toString());
}

function initializeLanguageSwitcher() {
    const urlLanguage = getLanguageFromUrl();
    const savedLanguage = localStorage.getItem('siteLanguage');
    const browserLanguage = (navigator.language || '').toLowerCase();
    const initialLanguage = urlLanguage || savedLanguage || (browserLanguage.startsWith('en') ? 'en' : 'pt');

    document.querySelectorAll('.lang-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            applyLanguage(btn.getAttribute('data-lang'));
        });
    });

    applyLanguage(initialLanguage);
}

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
document.addEventListener('DOMContentLoaded', initializeLanguageSwitcher);

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


