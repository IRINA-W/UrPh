'use strict';

//========== form & modals

const overlay = document.querySelector('.overlay');
const text = overlay.querySelector('p');
const close = overlay.querySelector('.modal__close');

close.addEventListener('click', closeModal);
overlay.addEventListener('click', function(e) {
	if (e.target === overlay) {
		closeModal();
	}
});

function closeModal() {
	overlay.classList.remove('active');
	document.body.style.overflow = '';
}

const form = document.querySelector('#form');
form.addEventListener('submit', formSend);

async function formSend(e) {
	e.preventDefault();
	let error = formValidate(form);
	let formData = new FormData(form);

	if (error === 0) {
		form.classList.add('_sending');
		
		let response = await fetch('mailer/sendmail.php', {
			method: 'POST',
			body: formData
		});

		if (response.ok) {
			let result = await response.json();
			text.innerHTML = result.message;
			overlay.classList.add('active');
			document.body.style.overflow = 'hidden';
			form.reset();
			form.classList.remove('_sending');
		} else {
			text.innerHTML = 'Ошибка';
			overlay.classList.add('active');
			document.body.style.overflow = 'hidden';
			form.classList.remove('_sending');
		}

	} else {
		text.innerHTML = 'Заполните все поля, помеченные звёздочкой';
		overlay.classList.add('active');
		document.body.style.overflow = 'hidden';
	}
}

function formValidate(form) {
	let error = 0;
	let formReq = form.querySelectorAll('._req');

	for (let input of formReq) {
		if (input.value === '') {
			error++;
		}
	}
	return error;
}



//========== tabs

const tabs = document.querySelectorAll('.tab');

for (let tab of tabs) {
	tab.addEventListener('click', function() {
		const symb = tab.querySelector('.tab__symb');
		const panel = this.nextElementSibling;

		this.classList.toggle('tab_active');
		if (panel.style.maxHeight) {
			panel.style.maxHeight = null;
			symb.innerHTML = '\u002B';
		} else {
			panel.style.maxHeight = panel.scrollHeight + 'px';
			symb.innerHTML = '\u2212';
		}
	});
}



// ========== reviews

function isVisible(elem) {
	const coords = elem.getBoundingClientRect();
	const windowHeight = document.documentElement.clientHeight;
	const topVisible = coords.top > 100 && coords.top < windowHeight - 100;
	const bottomVisible = coords.bottom < windowHeight - 100 && coords.bottom > 100;

	return topVisible || bottomVisible;
}

function showVisible() {
	const blocks = document.querySelectorAll('.block');

	for (let block of blocks) {
		const spans = block.querySelectorAll('span');

		if (isVisible(block)) {
			for (let i = 0; i < spans.length; i++) {
				spans[i].classList.add('block_animated');
				spans[i].style.animationDelay = i/20 + 's';
			}
		}
	}
}

showVisible();
window.onscroll = showVisible;



//========== pageup

window.addEventListener('scroll', function() {
	const arrow = document.querySelector('.pageup');

	if (pageYOffset >= 500) {
		arrow.classList.add('active');
	} else {
		arrow.classList.remove('active');
	}
});



//========== burger, menu

const burger = document.querySelector('.burger');
const menu = document.querySelector('.menu');
const links = menu.querySelectorAll('.menu__item');

burger.addEventListener('click', function(e) {
	e.stopPropagation();
	burger.classList.toggle('burger_active');
	menu.classList.toggle('menu_active');
});

for (let link of links) {
	link.addEventListener('click', function() {
		burger.classList.remove('burger_active');
		menu.classList.remove('menu_active');
	});
}

document.addEventListener('click', function(e) {
	if (menu.classList.contains('menu_active') && e.target !== menu) {
		menu.classList.remove('menu_active');
		burger.classList.remove('burger_active');
	}
});



//========== slider

new Swiper('.swiper', {
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev'
	},
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
		dynamicBullets: true,
	},
	mousewheel: {
		invert: true,
		sensitivity: 1,
	},
	keyboard: {
		enabled: true,
		onlyInViewport: true,
		pageUpDown: true,
	},
	slidesPerView: 3,
	loop: true,
	effect: 'coverflow',
	coverflowEffect: {
		rotate: 30,
		stretch: 50,
		slideShadows: true,
		depth: 100,
	},
	preloadImages: false,
	lazy: {
		checkInView: true,
		loadOnTransitionStart: true,
		loadPrevNext: false,
	},
	watchSlidesProgress: true,
	watchSlidesVisibility: true,
	zoom: {
		maxRatio: 2,
		minRatio: 1,
	},
	breakpoints: {
		320: {
			slidesPerView: 1,
			coverflowEffect: {
				stretch: 300,
			},
		},
		768: {
			slidesPerView: 3,
			zoom: {
				maxRatio: 3,
			},
			coverflowEffect: {
				stretch: 50,
			},
		},
		1024: {
			zoom: {
				maxRatio: 2,
			},
		}
	},
});
