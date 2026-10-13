const I18N = {
	pt: {
		pageTitle: 'Alvalade Arise',
		brandLine: 'Alvalade Arise',
		heroCopy: 'Grandes novidades a caminho. Segue-nos nas redes sociais para a próxima revelação, e vê o aftermovie mais abaixo.',
		heroButton: 'Seguir as redes',
		heroAftermovieButton: 'Ver o aftermovie',
		socialLinksAria: 'Redes sociais',
		instagram: 'Instagram',
		facebook: 'Facebook',
		youtube: 'YouTube',
		aftermovieEyebrow: 'Recap 2026',
		aftermovieTitle: 'Aftermovie 2026',
		aftermovieCopy: 'Vê o aftermovie da edição 2026, enquanto aguardas pelas próximas novidades nas nossas redes.',
		videoNote: 'Se o embed estiver bloqueado no teu browser, usa o link do YouTube acima.',
		contactsTitle: 'Contactos',
		contactsLead: 'Fala connosco para bilhetes, informações e novidades do festival.',
		website: 'Website',
		address: 'Morada',
		email: 'Email',
		socialNetworks: 'Redes sociais',
		quickActionsAria: 'Ações rápidas de contacto',
		map: 'Mapa',
		youtubeButton: 'Abrir no YouTube'
	},
	en: {
		pageTitle: 'Alvalade Arise',
		brandLine: 'Alvalade Arise',
		heroCopy: 'Big news are coming soon. Follow us on social media for the next reveal, and watch the aftermovie below.',
		heroButton: 'Follow our socials',
		heroAftermovieButton: 'Watch the aftermovie',
		socialLinksAria: 'Social media links',
		instagram: 'Instagram',
		facebook: 'Facebook',
		youtube: 'YouTube',
		aftermovieEyebrow: '2026 recap',
		aftermovieTitle: 'Aftermovie 2026',
		aftermovieCopy: 'Here is last year’s aftermovie while you wait for the next updates on our socials.',
		videoNote: 'If the embed is restricted in your browser, use the YouTube link above.',
		contactsTitle: 'Contacts',
		contactsLead: 'Talk to us for tickets, updates, and festival news.',
		website: 'Website',
		address: 'Address',
		email: 'Email',
		socialNetworks: 'Social networks',
		quickActionsAria: 'Quick contact actions',
		map: 'Map',
		youtubeButton: 'Open on YouTube'
	}
};

function getLanguageFromUrl() {
	const params = new URLSearchParams(window.location.search);
	const urlLang = (params.get('lang') || '').toLowerCase();
	return urlLang === 'en' || urlLang === 'pt' ? urlLang : null;
}

function updateLanguageInUrl(language) {
	const url = new URL(window.location.href);
	url.searchParams.set('lang', language);
	window.history.replaceState({}, '', url.toString());
}

function applyLanguage(language) {
	const lang = language === 'en' ? 'en' : 'pt';
	const dictionary = I18N[lang];

	document.documentElement.lang = lang === 'en' ? 'en' : 'pt-BR';
	document.title = dictionary.pageTitle;

	document.querySelectorAll('[data-i18n]').forEach((element) => {
		const key = element.getAttribute('data-i18n');
		if (dictionary[key]) {
			element.textContent = dictionary[key];
		}
	});

	document.querySelectorAll('[data-i18n-aria-label]').forEach((element) => {
		const key = element.getAttribute('data-i18n-aria-label');
		if (dictionary[key]) {
			element.setAttribute('aria-label', dictionary[key]);
		}
	});

	document.querySelectorAll('.lang-btn').forEach((button) => {
		button.classList.toggle('active', button.getAttribute('data-lang') === lang);
	});

	localStorage.setItem('siteLanguage', lang);
	updateLanguageInUrl(lang);
}

function initializeLanguageSwitcher() {
	const urlLanguage = getLanguageFromUrl();
	const savedLanguage = localStorage.getItem('siteLanguage');
	const browserLanguage = (navigator.language || '').toLowerCase();
	const initialLanguage = urlLanguage || savedLanguage || (browserLanguage.startsWith('en') ? 'en' : 'pt');

	document.querySelectorAll('.lang-btn').forEach((button) => {
		button.addEventListener('click', () => {
			applyLanguage(button.getAttribute('data-lang'));
		});
	});

	applyLanguage(initialLanguage);
}

function initializeCarousel() {
	const carouselTrack = document.getElementById('carousel-track');
	if (!carouselTrack) {
		return;
	}

	for (let index = 1; index <= 16; index += 1) {
		const slide = document.createElement('div');
		slide.className = 'carousel-slide';
		slide.style.backgroundImage = `url('assets/images/hero/banner_${index}.jpg')`;
		if (index === 1) {
			slide.classList.add('active');
		}
		carouselTrack.appendChild(slide);
	}

	const slides = Array.from(carouselTrack.querySelectorAll('.carousel-slide'));
	let currentSlide = 0;

	window.setInterval(() => {
		if (slides.length === 0) {
			return;
		}

		slides[currentSlide].classList.remove('active');
		currentSlide = (currentSlide + 1) % slides.length;
		slides[currentSlide].classList.add('active');
	}, 5000);
}

document.addEventListener('DOMContentLoaded', initializeLanguageSwitcher);
document.addEventListener('DOMContentLoaded', initializeCarousel);
